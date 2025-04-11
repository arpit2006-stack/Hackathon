import { startNomination, createNominee } from "../controller/register.controller.js";
import express from 'express';

const router = express.Router();

// Step 1: Initiate nomination and send OTP
router.post("/nominate/start", startNomination);

// Step 2: Verify OTP and complete nomination
router.post("/nominate/complete", createNominee);

export default router;