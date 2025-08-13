import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || null,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
