import Nominee from "../models/register.model.js";

export const login = async (req, res, next) => {
  const { name, regID } = req.body;

  try {
    // Validate input fields
    if (!name || !regID) {
      const error = new Error("Name and registration ID are required");
      error.statusCode = 400;
      throw error;
    }

    // Sanitize inputs (basic trimming, additional validation can be added)
    const trimmedName = name.trim();
    const trimmedRegID = regID.trim();

    if (!trimmedName || !trimmedRegID) {
      const error = new Error("Name and registration ID cannot be empty");
      error.statusCode = 400;
      throw error;
    }

    // Query MongoDB for the nominee by name
    const nominee = await Nominee.findOne({ name: trimmedName });

    // Check if nominee exists
    if (!nominee) {
      const error = new Error("No user found with the provided name");
      error.statusCode = 401;
      throw error;
    }

    // Verify registration ID
    if (nominee.regID !== trimmedRegID) {
      const error = new Error("Invalid registration ID");
      error.statusCode = 401;
      throw error;
    }

    // Login successful, return success response
    res.status(200).json({
      message: "Login successful",
      user: {
        name: nominee.name,
        regID: nominee.regID,
      },
    });
  } catch (error) {
    // Ensure statusCode is set, default to 500 for unexpected errors
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};