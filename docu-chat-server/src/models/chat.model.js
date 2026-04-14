/**
 * Chat Schema
 *
 * Represents a chat document in the MongoDB database.
 * Each chat is associated with a specific user and stores conversation metadata.
 *
 * @typedef {Object} Chat
 * @property {mongoose.Schema.Types.ObjectId} userId - Reference to the User document. Establishes a one-to-many relationship where one User can have multiple Chats. Required field.
 * @property {String} [title="New Chat"] - The title or name of the chat conversation. Defaults to "New Chat" if not provided.
 * @property {String} [lastMessage] - The content of the most recent message in the chat. Optional field used for quick retrieval without querying messages collection.
 * @property {Date} createdAt - Automatically generated timestamp indicating when the chat was created.
 * @property {Date} updatedAt - Automatically generated timestamp indicating the last modification of the chat document.
 *
 * @schema The schema enforces a relationship between Chat and User collections via userId foreign key reference.
 * This allows for efficient querying of all chats belonging to a specific user.
 */
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "New Chat",
    },

    lastMessage: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Chat", chatSchema);
