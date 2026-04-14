import Message from "../models/message.model";
import Chat from "../models/chat.model";

export const sendMessage = async (req, res, next) => {
  try {
    const { chatId, content } = req.body;

    const message = await Message.create({
      chatId,
      userId: req.user._id,
      role: "user",
      content,
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: content,
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
  } catch (error) {
    next(error);
  }
};
