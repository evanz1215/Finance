import { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";
import { HTTPSTATUS } from "../config/http.config";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { AppError } from "../utils/app-error";

const formatZodError = (res: Response, error: ZodError) => {
  const errors = error?.issues.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));

  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation Error",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log("Error occurred on PATH:", req.path, "Error:", error);

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error.message || "Unknown error occurred",
  });
};
