import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "./types";
import User from "../models/userModel";
import { createError } from "../utils/error";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw createError("Authentication token required", 401);
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      throw createError("User not found", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const isManager = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw createError("Authentication required", 401);
    }

    if (req.user.userType !== "manager") {
      throw createError("Access denied. Managers only.", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const isEmployee = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw createError("Authentication required", 401);
    }

    if (req.user.userType !== "employee") {
      throw createError("Access denied. Employees only.", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
