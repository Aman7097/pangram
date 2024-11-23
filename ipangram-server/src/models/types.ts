import { Types } from "mongoose";

export enum UserRole {
  EMPLOYEE = "employee",
  MANAGER = "manager",
}

export interface IUser {
  employeeID: string;
  email: string;
  password: string;
  userType: UserRole;
  jobRole: string;
  firstName: string;
  lastName: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmployee extends IUser {
  role: UserRole.EMPLOYEE;
  department?: string; // Reference to Department
  manager?: string; // Reference to Manager
}

export interface IManager extends IUser {
  role: UserRole.MANAGER;
  managedDepartments: string[]; // References to Department
}

export interface IDepartment {
  name: string;
  description?: string;
  manager: Types.ObjectId;
  employees: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
