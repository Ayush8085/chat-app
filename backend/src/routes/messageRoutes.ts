import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = Router();

router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

export default router;
