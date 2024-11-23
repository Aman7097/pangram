import { Response, NextFunction, Request } from "express";
import { AuthRequest } from "../routes/types";
import Department from "../models/departmentModel";
import { createError } from "../utils/error";

export const departmentController = {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;

      const department = await Department.create({
        name,
        description,
        manager: req.user?._id,
      });

      res.status(201).json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const department = await Department.findOneAndUpdate(
        { _id: id, manager: req.user?._id },
        { name, description },
        { new: true, runValidators: true }
      );

      if (!department) {
        throw createError("Department not found", 404);
      }

      res.json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const department = await Department.findOneAndDelete({
        _id: id,
        manager: req.user?._id,
      });

      if (!department) {
        throw createError("Department not found", 404);
      }

      res.json({
        success: true,
        message: "Department deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      // Simple pagination with default values
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 6;
      const skip = (page - 1) * limit;

      const departments = await Department.find()
        .populate("manager", "firstName lastName email")
        .populate("employees", "firstName lastName email")
        .skip(skip)
        .limit(limit);

      const total = await Department.countDocuments();

      res.json({
        success: true,
        data: departments,
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

      const department = await Department.findById(id)
        .populate("manager", "firstName lastName email")
        .populate("employees", "firstName lastName email");

      if (!department) {
        throw createError("Department not found", 404);
      }

      res.json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  },

  async assignEmployees(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { employeeIds } = req.body;

      const department = await Department.findOneAndUpdate(
        { _id: id, manager: req.user?._id },
        { $addToSet: { employees: { $each: employeeIds } } },
        { new: true, runValidators: true }
      );

      if (!department) {
        throw createError("Department not found", 404);
      }

      res.json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  },

  async removeEmployee(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id, employeeId } = req.params;

      const department = await Department.findOneAndUpdate(
        { _id: id, manager: req.user?._id },
        { $pull: { employees: employeeId } },
        { new: true }
      );

      if (!department) {
        throw createError("Department not found", 404);
      }

      res.json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  },
};
