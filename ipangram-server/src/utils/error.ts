import { CustomError } from "../middleware/error.middleware";

export const createError = (
  message: string,
  statusCode: number,
  errors?: any[]
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  if (errors) {
    error.errors = errors;
  }
  return error;
};
