import express from 'express';
import { verifComitte } from '../controller/committee.controller.js';
import { TokenGuard } from '../middleware/org.middleware.js';


const router = express.Router();


router.post("/login",verifComitte);

export default router;
