import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import Employee from "../models/employeeModel";
import Manager from "../models/managerModel";
import { createError } from "../utils/error";
import { AuthRequest } from "../routes/types";
import { UserRole } from "../models/types";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "24h";

function generateEmployeeId(userType: UserRole): string {
  // Generate 4 random digits
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  // Prefix with M- for manager or E- for employee
  const prefix = userType === UserRole.MANAGER ? "M-" : "E-";
  return `${prefix}${randomNumbers}`;
}

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        location,
        jobRole,
        userType,
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw createError("Email already registered", 400);
      }

      // Generate employee ID
      const employeeID = generateEmployeeId(userType);
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user based on role
      let user;
      const userData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        location,
        userType,
        employeeID, // Add the generated employee ID
        jobRole,
      };

      if (userType === UserRole.MANAGER) {
        user = await Manager.create(userData);
      } else {
        user = await Employee.create(userData);
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.status(201).json({
        success: true,
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw createError("Invalid credentials", 401);
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw createError("Invalid credentials", 401);
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.json({
        success: true,
        data: {
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getCurrentUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        throw createError("User not found", 404);
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response) {
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  },
};
