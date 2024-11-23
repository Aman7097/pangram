import { Response, NextFunction } from "express";
import { AuthRequest, FilterQuery } from "../routes/types";
import Employee from "../models/employeeModel";
import { createError } from "../utils/error";
import { UserRole } from "../models/types";
import User from "../models/userModel";
import Department from "../models/departmentModel";

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
      const limit = Number(req.query.limit) || 6;
      const skip = (page - 1) * limit;
      const filter = req.query.filters as string;

      let projection = {};
      let sortQuery = {};

      // Handle sorting
      switch (filter) {
        case "locationAsc":
          sortQuery = { location: 1 };
          break;
        case "locationDesc":
          sortQuery = { location: -1 };
          break;
        case "nameAsc":
          sortQuery = { firstName: 1, lastName: 1 };
          break;
        case "nameDesc":
          sortQuery = { firstName: -1, lastName: -1 };
          break;
        default:
          // Default sorting, you can modify this as needed
          sortQuery = { createdAt: -1 };
      }

      // For regular employees, only show basic info of all employees
      if (req.user?.userType === UserRole.EMPLOYEE) {
        projection = {
          firstName: 1,
          lastName: 1,
          jobRole: 1,
          location: 1,
          department: 1,
        };
      } else {
        // For managers
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

      // First, get all departments to map employees to their departments
      const departments = await Department.find({}).lean();

      // Create a map of employeeId to department
      const employeeDepartmentMap = new Map();
      departments.forEach((dept) => {
        dept.employees?.forEach((empId) => {
          employeeDepartmentMap.set(empId.toString(), {
            _id: dept._id,
            name: dept.name,
          });
        });
      });

      const employees = (await User.find({}, projection)
        .populate(req.user?.userType === UserRole.MANAGER ? "department" : null)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean()) as any;

      const total = await User.countDocuments();

      // Format response - only format department if manager
      // Format response with department information from the map
      const formattedEmployees = employees.map((employee: any) => {
        const departmentInfo = employeeDepartmentMap.get(
          employee._id.toString()
        );
        return {
          ...employee,
          department:
            req.user?.userType === UserRole.MANAGER
              ? departmentInfo?.name || null
              : "None",
        };
      });
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
