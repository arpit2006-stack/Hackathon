import ORG from '../models/orgcreate.model.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../lib/utils.js';

export const verifComitte = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    // Validate inputs
    if (!name || !password) {
      const error = new Error('Name and password are required');
      error.statusCode = 400;
      throw error;
    }

    // Find organization by name
    const org = await ORG.findOne({ name });
    if (!org) {
      const error = new Error('Invalid name or password');
      error.statusCode = 404;
      throw error;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) {
      const error = new Error('Invalid name or password');
      error.statusCode = 401;
      throw error;
    }

    // Generate token
    generateToken(org._id, res);

    // Send success response
    res.status(200).json({
      message: `Welcome Back ${org.name}`,
      email: org.email,
    });
  } catch (error) {
    next(error);
  }
};