import { z } from "zod";
import { UserRole } from "../models/types";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    location: z.string().min(2),
    userType: z.enum([UserRole.EMPLOYEE, UserRole.MANAGER]),
    jobRole: z.string().min(2),
  }),
});

export const departmentSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
  }),
});

export const updateEmployeeSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    location: z.string().min(2).optional(),
    department: z.string().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});
