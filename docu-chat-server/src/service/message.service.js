import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

export const createMessage = async ({ chatId, userId, role, content }) => {
  const message = await Message.create({
    chatId,
    userId,
    role,
    content,
  });

  await Chat.findByIdAndUpdate(chatId, {
    lastMessage: content,
  });

  return message;
};
