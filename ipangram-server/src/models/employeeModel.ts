import mongoose, { Schema, Model, Document } from "mongoose";
import { IEmployee, UserRole } from "./types";
import User from "./userModel";

interface IEmployeeDocument extends IEmployee, Document {}

const employeeSchema = new Schema<IEmployeeDocument>({
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  role: {
    type: String,
    default: UserRole.EMPLOYEE,
    immutable: true,
  },
});

const Employee = User.discriminator("Employee", employeeSchema);
export default Employee;
