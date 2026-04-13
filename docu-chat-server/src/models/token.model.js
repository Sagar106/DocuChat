import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  token: {
    type: String,
    required: true,
  },

  expiresAt: Date,
});

export default mongoose.model("Token", tokenSchema);
