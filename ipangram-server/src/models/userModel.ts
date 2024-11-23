import mongoose, { Schema, Model, Document } from "mongoose";
import { IUser, UserRole } from "./types";

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    employeeID: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for filtering and searching
userSchema.index({ location: 1 });
userSchema.index({ firstName: 1, lastName: 1 });

const User: Model<IUserDocument> = mongoose.model("User", userSchema);
export default User;
