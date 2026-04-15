import Message from "../models/message.model";
import { createMessage } from "../service/message.service";

export const sendMessage = async (req, res, next) => {
  try {
    const { chatId, content } = req.body;

    const message = await createMessage({
      chatId,
      userId: req.user._id,
      role: "user",
      content,
    });

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({
      chatId,
    })
      .sort({
        createdAt: 1,
      })
      .lean();

    res.json(messages);
  } catch (error) {
    next(error);
  }
};
