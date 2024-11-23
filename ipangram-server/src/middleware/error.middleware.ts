import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export interface CustomError extends Error {
  statusCode?: number;
  errors?: any[];
  code?: string; // For MongoDB/Mongoose errors
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    errors: err.errors,
    path: req.path,
    method: req.method,
  });

  // Handle MongoDB duplicate key error
  if (err.code === "11000") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry found",
      error: err.message,
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    errors: err.errors,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
