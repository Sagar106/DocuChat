import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createChat,
  getChats,
  getChat,
  renameChat,
  deleteChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createChat);

router.get("/", getChats);

router.get("/:id", getChat);

router.put("/:id", renameChat);

router.delete("/:id", deleteChat);

export default router;
