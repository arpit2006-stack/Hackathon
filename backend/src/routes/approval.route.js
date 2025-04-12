import { show , updateStatus } from "../controller/approval.controller.js";
import express from 'express';

const router = express.Router();

// Add console.log to verify route is being registered
// In your routes file
router.get('/approval/:post', show); // GET /api/candidates/approval/Secretary

router.patch("/approval/:id", updateStatus);

export default router;