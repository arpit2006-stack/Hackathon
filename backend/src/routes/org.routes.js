import express from 'express';
import { signup } from '../controller/org.controller.js';

const router = express.Router();

// Improved route handler with better debugging
router.post("/signup", 
  (req, res, next) => {
    console.log("Signup route hit - Request Body:", req.body); // Log incoming data
    next();
  },
  signup // Your controller function
);

export default router;