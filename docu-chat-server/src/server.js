import http from "http";

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

import { initSocket } from "./socket/socket.js";

const PORT = process.env.PORT || 8000;

connectDB();

const server = http.createServer(app);

initSocket(server);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
