/**
 * Message Schema
 *
 * Represents a message document in the Message collection.
 * Messages are associated with chats and users, containing role-based content.
 *
 * @typedef {Object} Message
 * @property {mongoose.Schema.Types.ObjectId} chatId - Reference to the Chat document. Used to associate the message with a specific conversation. Required.
 * @property {mongoose.Schema.Types.ObjectId} userId - Reference to the User document. Identifies the message author. Optional.
 * @property {string} role - The role of the message sender. Must be one of: "user", "assistant", or "system". Required.
 * @property {string} content - The message text content. Required.
 * @property {Date} createdAt - Timestamp of message creation. Automatically set by MongoDB.
 * @property {Date} updatedAt - Timestamp of last message update. Automatically updated by MongoDB.
 *
 * @relationship {Chat} chatId - Each message belongs to one Chat document
 * @relationship {User} userId - Each message may be associated with one User document
 */
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Message", messageSchema);
