import { recieve } from "../controller/inquiry.controller.js";
import express from "express";

const router = express.Router();

router.post("/inquiry", recieve);

export default router;
