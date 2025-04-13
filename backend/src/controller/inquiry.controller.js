import Letter from "../models/inquriy.model.js";

export const recieve = async (req, res, next) => {
  const { name, email, orgName, orgType, orgAddress, orgPincode, contact } = req.body;
  
  try {
    // Validation checks
    if (!name || !email || !orgName || !orgType || !orgAddress || !orgPincode || !contact) {
      const error = new Error("Please fill all the details");
      error.statusCode = 400;  // Fixed typo: statuscode -> statusCode
      return next(error);
    }

    if (orgPincode.length !== 6 || isNaN(orgPincode)) {  // Fixed validation logic
      const error = new Error("Please provide a valid 6-digit pincode");
      error.statusCode = 400;
      return next(error);
    }

    if (contact.length !== 10 || isNaN(contact)) {  // Fixed validation logic
      const error = new Error("Please provide a valid 10-digit phone number");
      error.statusCode = 400;
      return next(error);
    }

    // Check for existing inquiry
    const existingInquiry = await Letter.findOne({ email });  // Changed find to findOne
    if (existingInquiry) {
      const error = new Error("Request already made. Please wait for the response");
      error.statusCode = 400;
      return next(error);
    }

    // Create new inquiry
    const newInquiry = await Letter.create({
      name,
      email,
      orgName,
      orgType,
      orgAddress,
      orgPincode,
      contact,
    });

    res.status(201).json({  // Changed to 201 for resource creation
      success: true,
      message: "Your request has been successfully submitted. You will receive a response within 24 hours.",
      data: newInquiry  // Optionally include the created document
    });

  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      error.statusCode = 400;
      error.message = Object.values(error.errors).map(val => val.message).join(', ');
    }
    next(error);
  }
};