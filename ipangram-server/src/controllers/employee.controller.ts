import { Response, NextFunction } from "express";
import { AuthRequest, FilterQuery } from "../routes/types";
import Employee from "../models/employeeModel";
import { createError } from "../utils/error";
import { UserRole } from "../models/types";
import User from "../models/userModel";

export const employeeController = {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const employeeData = {
        ...req.body,
        role: UserRole.EMPLOYEE,
      };

      const employee = await Employee.create(employeeData);

      res.status(201).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const employee = await Employee.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!employee) {
        throw createError("Employee not found", 404);
      }

      res.json({
        success: true,
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const employee = await Employee.findByIdAndDelete(id);

      if (!employee) {
        throw createError("Employee not found", 404);
      }

      res.json({
        success: true,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let projection = {};

      // For regular employees, only show basic info of all employees
      if (req.user?.userType === UserRole.EMPLOYEE) {
        projection = {
          firstName: 1,
          lastName: 1,
          jobRole: 1,
          location: 1,
        };
      } else {
        // For managers, show all fields
        projection = {
          employeeID: 1,
          email: 1,
          userType: 1,
          jobRole: 1,
          firstName: 1,
          lastName: 1,
          location: 1,
          role: 1,
          createdAt: 1,
          updatedAt: 1,
          department: 1,
        };
      }

      const employees = (await User.find({}, projection)
        .populate(req.user?.userType === UserRole.MANAGER ? "department" : null)
        .skip(skip)
        .limit(limit)
        .lean()) as any;

      const total = await User.countDocuments();

      // Format response - only format department if manager
      const formattedEmployees = employees.map((employee) => ({
        ...employee,
        department:
          req.user?.userType === UserRole.MANAGER
            ? employee?.department?.name || null
            : undefined,
      }));

      res.json({
        success: true,
        data: formattedEmployees,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async filterByLocation(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const { location } = req.query;

      const query: any = {
        role: UserRole.EMPLOYEE,
        location: { $regex: (location as string) || "", $options: "i" },
      };

      const employees = await Employee.find(query)
        .sort({ location: 1 })
        .skip(skip)
        .limit(limit);

      const total = await Employee.countDocuments(query);

      res.json({
        success: true,
        data: employees,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async filterByName(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const { order = "asc" } = req.query;

      const employees = await Employee.find({ role: UserRole.EMPLOYEE })
        .sort({
          firstName: order === "asc" ? 1 : -1,
          lastName: order === "asc" ? 1 : -1,
        })
        .skip(skip)
        .limit(limit);

      const total = await Employee.countDocuments({ role: UserRole.EMPLOYEE });

      res.json({
        success: true,
        data: employees,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      // Check if user has access to this employee data
      if (req.user?.userType === UserRole.EMPLOYEE && req.user._id !== id) {
        throw createError("Access denied", 403);
      }

      const employee = await Employee.findById(id).populate(
        "department",
        "name"
      );

      if (!employee) {
        throw createError("Employee not found", 404);
      }

      res.json({
        success: true,
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  },
};
