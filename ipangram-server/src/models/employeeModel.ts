import mongoose, { Schema, Model, Document, Types } from "mongoose";
import { IEmployee, UserRole } from "./types";
import User from "./userModel";

interface IEmployeeDocument extends IEmployee, Document {
  department: Types.ObjectId | string;
  manager: Types.ObjectId | string;
}

const employeeSchema = new Schema<IEmployeeDocument>({
  department: {
    type: Schema.Types.ObjectId as any,
    ref: "Department",
  },
  manager: {
    type: Schema.Types.ObjectId as any,
    ref: "User",
  },
  role: {
    type: String,
    default: UserRole.EMPLOYEE,
    immutable: true,
  },
});

const Employee = User.discriminator<IEmployeeDocument>(
  "Employee",
  employeeSchema
);
export default Employee;
