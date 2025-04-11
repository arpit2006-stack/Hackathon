// controllers/nominee.controller.js
import Nominee from "../models/register.model.js";
import { sendVerificationOTP, verifyOTP } from "../utils/opsend.js";

// Step 1: Receive initial details and send OTP
export const startNomination = async (req, res, next) => {
  console.log("i am in");
  
  const { email, name, age, post } = req.body;
  
  try {
    // Validate initial fields
    if (!email || !name || !age || !post) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    // Send OTP directly to the provided email
    await sendVerificationOTP(email);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email"
    });

  } catch (error) {
    next(error);
  }
};

// Step 2: Verify OTP and create nominee
export const createNominee = async (req, res, next) => {
  const { email, name, age, post, otp } = req.body;

  try {
    // Validate all fields again
    if (!email || !name || !age || !post || !otp) {
      const error = new Error("All fields including OTP are required");
      error.statusCode = 400;
      throw error;
    }

    // Verify OTP against email
    await verifyOTP(email, otp);

    // Create nominee after successful verification
    const nominee = await Nominee.create({
      email,
      name,
      age,
      post
    });

    res.status(201).json({
      success: true,
      message: "Nomination created successfully",
      data: nominee
    });

  } catch (error) {
    next(error);
  }
};