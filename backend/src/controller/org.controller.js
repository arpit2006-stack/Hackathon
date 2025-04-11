import ORG from "../models/orgcreate.model.js";
import { sendDetails } from "../utils/emailsender.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { email, name, password, committeeMembers } = req.body; // Changed to committeeMembers array
  
  try {
    // Validate all required fields
    if (!email || !name || !password || !committeeMembers) {
      const error = new Error("All details are required");
      error.statuscode = 400;
      return next(error);
    }

    // Validate committee members structure
    if (!Array.isArray(committeeMembers)) {
      const error = new Error("Committee members must be an array");
      error.statuscode = 400;
      return next(error);
    }
    

    const hashedpass = await bcrypt.hash(password, 5);

    const organization = await ORG.create({
      email,
      name,
      password: hashedpass,
      committeeMembers: committeeMembers.map(member => ({
        name: member.committeeName,       // Match schema field names
        email: member.committeeMail,
        phone: member.committeePhone
      }))
    });

    // Send email without password (security)
    await sendDetails(email, name, "[Password set during registration]");

    res.status(201).json({ 
      message: `Welcome to the Portal ${name}`,
      committeeCount: committeeMembers.length 
    });
    
  } catch (error) {
    next(error);
  }
};