import Apply from "../models/nominee.model.js";
import Nominee from "../models/register.model.js";
import fs from 'fs';
import cloudinary from '../lib/cloudinary.js';

export const Application = async (req, res, next) => {
  const {registrationId, name, email, contactNo, post, agenda } = req.body;
  let cloudinaryResult = null; // Declare variable outside try-catch

  try {
    // Validate required fields
    if (!name || !email || !contactNo || !post || !agenda ||!candidateID) {
      throw new Error("Please fill out all the details");
    }

    if (!req.file) {
      throw new Error("No file provided");
    }

    const candidate = await Nominee.findOne({registrationId})
    if(!candidate){
      const error = new Error("Candidate does not exist ")
    }

    // Check for existing nominee
    const exist = await Apply.findOne({ email });
    if (exist) {
      throw new Error("Email already exists");
    }

    // Upload file to Cloudinary
    cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'nomination-proofs',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      resource_type: 'auto'
    });

    // Delete temporary file after upload
    fs.unlinkSync(req.file.path);

    // Create new nominee with status and image
    await Apply.create({
      name,
      email,
      contactNo,
      post,
      agenda,
      ssamt: {  // Storing Cloudinary result
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id
      },
      status: 'Pending'
    });

    res.status(200).json({
      success: true,
      message: "Nomination submitted successfully. You'll receive email notification about approval/rejection.",
      data: {
        name,
        email,
        post
      }
    });

  } catch (error) {
    // Cleanup uploaded file if error occurred
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    // Cleanup Cloudinary upload if failed after upload
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }

    error.statusCode = error.statusCode || 400;
    next(error);
  }
};