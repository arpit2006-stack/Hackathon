import { Application } from "../controller/nominate.controller.js";
import express from 'express'
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.post("/apply",upload.single('ssamt'),Application);

export default router;