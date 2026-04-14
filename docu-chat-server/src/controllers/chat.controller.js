import Chat from "../models/chat.model.js";
import logger from "../config/logger.js";
import Message from "../models/message.model.js";

export const createChat = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const chat = await Chat.create({
      userId,
      title: "New Chat",
    });

    res.status(201).json(chat);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({
      userId,
    })
      .sort({ updatedAt: -1 })
      .lean();

    res.json(chats);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

export const getChat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chat = await Chat.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!chat) {
      res.status(404);
      throw new Error("Chat not found");
    }

    res.json(chat);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

export const renameChat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title } = req.body;

    const chat = await Chat.findOneAndUpdate(
      {
        _id: id,
        userId: req.user._id,
      },
      { title },
      { new: true },
    );

    res.json(chat);
  } catch (error) {
    next(error);
  }
};

export const deleteChat = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Chat.deleteOne({
      _id: id,
      userId: req.user._id,
    });

    await Message.deleteMany({
      chatId: id,
    });

    res.json({ message: "Chat deleted" });
  } catch (error) {
    next(error);
  }
};
