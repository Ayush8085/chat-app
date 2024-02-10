import { ErrorRequestHandler } from "express";
import { NODE_ENV } from "../config.js";

const errorMiddleware: ErrorRequestHandler = async (err, req, res, next) => {
  const statusCode = req.statusCode ? req.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    stack: NODE_ENV === "development" ? err.stack : null,
  });
};

export default errorMiddleware;
