import { Request } from "express";
import { IUser } from "../models/types";
import mongoose from "mongoose";

export interface AuthRequest extends Request {
  user?: IUser;
}
