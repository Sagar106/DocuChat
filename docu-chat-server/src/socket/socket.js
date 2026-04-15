import { Server } from "socket.io";
import logger from "../config/logger.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const { token } = socket.handshake.auth;

      if (!token) {
        return next(new Error("Authentication Error"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      socket.user = user;

      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    logger.info(`User Connected: ${socket.user}`);

    socket.on("join_chat", async (chatId) => {
      try {
        socket.join(chatId);

        logger.info(`User joined chat ${chatId}`);
      } catch (error) {
        logger.error(error.message);
      }
    });

    socket.on("send_message", async (data) => {
      try {
        const { chatId, content } = data;

        const message = await createMessage({
          chatId,
          userId: socket.user._id,
          role: "user",
          content,
        });

        io.to(chatId).emit("receive_message", message);
      } catch (error) {
        logger.error(error.message);
      }
    });

    socket.on("disconnect", () => {
      logger.info("User disconnected");
    });
  });
};

export const getIo = () => io;
