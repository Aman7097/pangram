import { Request } from "express";
import { IUser, UserRole } from "../models/types";

export interface AuthRequest extends Request {
  user?: IUser & { _id: string };
}

export interface FilterQuery {
  _id: string;
  location?: {
    $regex: string;
    $options: string;
  };
  name?: {
    $regex: string;
    $options: string;
  };
  role?: UserRole;
}
