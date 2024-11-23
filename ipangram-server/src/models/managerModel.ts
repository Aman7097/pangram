import mongoose, { Schema, Model, Document } from "mongoose";
import { IManager, UserRole } from "./types";
import User from "./userModel";

interface IManagerDocument extends IManager, Document {}

const managerSchema = new Schema<IManagerDocument>({
  managedDepartments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
  role: {
    type: String,
    default: UserRole.MANAGER,
    immutable: true,
  },
});

const Manager = User.discriminator("Manager", managerSchema);
export default Manager;
