import mongoose, { Schema, Model, Document } from "mongoose";
import { IDepartment } from "./types";

interface IDepartmentDocument extends IDepartment, Document {}

const departmentSchema = new Schema<IDepartmentDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Department: Model<IDepartmentDocument> = mongoose.model(
  "Department",
  departmentSchema
);
export default Department;
