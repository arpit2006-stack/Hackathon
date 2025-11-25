import express from 'express';
import { verifComitte } from '../controller/committee.controller.js';


const router = express.Router();


router.post("/login",verifComitte);

export default router;
