import express, { Router } from "express";
import { getAllMessages, sendMessage } from "../controller/messageController";

const router: Router = express.Router();

// Routes without token/auth middleware
router.post("/send", sendMessage);
router.get("/getall", getAllMessages);

export default router;
