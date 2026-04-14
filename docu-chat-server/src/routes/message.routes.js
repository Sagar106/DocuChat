import express from "express";

import protect from "../middleware/auth.middleware.js";

import { sendMessage, getMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", sendMessage);

router.get("/:chatId", getMessages);

export default router;
