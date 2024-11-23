import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { createError } from "../utils/error";

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error, "erros");
        next(createError("Validation error", 400, error.errors));
      } else {
        next(error);
      }
    }
  };
};
