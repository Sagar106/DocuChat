import logger from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
