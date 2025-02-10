import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import ApiError from "../utils/apiError";
import AuthError from "../utils/authError";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Handle Joi Validation Errors
  if (err instanceof ValidationError) {
    res.status(400).json({
      status: "error",
      type: "validation_error",
      message: "Validation Error",
      errors: err.details.map((detail) => ({
        field: detail.context?.key || "unknown",
        message: detail.message,
      })),
    });
  }

  // Handle Custom API Errors
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: "error",
      type: "api_error",
      message: err.message,
    });
  }

  if (err instanceof AuthError) {
    res.status(err.statusCode).json({
      status: "error",
      type: "auth_error",
      message: err.message,
    });
  }

  // Handle unexpected errors
  console.error("Unexpected Error:", err);
  res.status(500).json({
    status: "error",
    type: "internal_server_error",
    message: "Something broke!",
  });
};
