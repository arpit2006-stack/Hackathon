import Nominee from "../models/register.model.js";
import { sendVerificationOTP, verifyOTP } from "../utils/opsend.js";
import { sendRegistrationEmail } from "../utils/regisSender.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";
import path from "path";



const generateRegistrationId = (role) => {
  const datePart = Date.now().toString().slice(-6);
  const randomPart = Math.random().toString(36).substr(2, 4).toUpperCase();

  if (role === "candidate") {
    return `CAND-${datePart}-${randomPart}`;
  } else if (role === "voter") {
    return `VOTER-${datePart}-${randomPart}`;
  } else {
    throw new Error("Invalid role for registration ID generation");
  }
};


// Step 1: Receive initial details and send OTP
export const startNomination = async (req, res, next) => {
  try {
    // Validate file exists
    if (!req.file) {
      throw new Error("ID proof image is required");
    }

    // Validate form data
    const { email, name, age, role } = req.body;
    if (!email || !name || !age || !role) {
      // Cleanup uploaded file if validation fails
      fs.unlinkSync(req.file.path);
      throw new Error("All fields are required");
    }

    if (age < 21 || age > 100) {
      fs.unlinkSync(req.file.path);
      throw new Error("Age must be between 21-100");
    }

    // Check for existing nominee
    const existing = await Nominee.findOne({ email });
    //  roller = await Nominee.findOne({ email }).select(role);
    if (existing) {
      fs.unlinkSync(req.file.path);
      throw new Error("Nominee already registered");
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "election-id-proofs",
      allowed_formats: ["jpg", "png", "jpeg"],
    });

    // Delete temporary file after upload
    fs.unlinkSync(req.file.path);

    // Store reference in database instead of session
    await Nominee.create({
      email,
      name,
      age,
      role,
      registrationId: generateRegistrationId(role),
      tempIdProof: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });

    // Send OTP
    await sendVerificationOTP(email);

    res.status(200).json({
      success: true,
      message: "OTP sent to registered email",
    });
  } catch (error) {
    // Cleanup any uploaded files on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    error.statusCode = error.statusCode || 400;
    next(error);
  }
};

// Step 2: Verify OTP and complete registration
export const createNominee = async (req, res, next) => {
  try {
    const { email, name, age, otp } = req.body;

    // Validate all fields
    if (!otp) {
      throw new Error("All fields including OTP are required");
    }

    // Verify OTP
    await verifyOTP(email, otp);

    // Find temporary record
    const tempNominee = await Nominee.findOne({ email });
    if (!tempNominee?.tempIdProof) {
      throw new Error("Registration session expired, please start again");
    }

    // Move image to permanent location in Cloudinary
    const finalResult = await cloudinary.uploader.rename(
      tempNominee.tempIdProof.publicId,
      `election-id-proofs/approved/${tempNominee._id}`
    );

    // Update nominee record
    const nominee = await Nominee.findByIdAndUpdate(
      tempNominee._id,
      {
        $set: {
          registrationId: generateRegistrationId(tempNominee.role),
          idProof: {
            url: finalResult.secure_url,
            publicId: finalResult.public_id,
          },
        },
        $unset: { tempIdProof: 1 },
      },
      { new: true }
    );

    // Send confirmation email
    await sendRegistrationEmail(email, name, nominee.registrationId);

    res.status(201).json({
      success: true,
      message: "Nomination successful. Check email for registration ID",
      data: {
        id: nominee.registrationId,
        name: nominee.name,
        // post: nominee.post
      },
    });
  } catch (error) {
    // Cleanup Cloudinary assets if something failed
    if (error.tempNominee?.tempIdProof?.publicId) {
      await cloudinary.uploader.destroy(error.tempNominee.tempIdProof.publicId);
    }
    error.statusCode = error.statusCode || 400;
    next(error);
  }
};
