import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { CODES } from "../utils/ErrorCodes";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(CODES.UNAUTHORIZED, "Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(CODES.UNAUTHORIZED, "Unauthorized: Token missing");
    }

    const decoded = jwt.verify(token, "secret");
    (req as any).user = decoded;
    next();
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(CODES.UNAUTHORIZED, "Unauthorized: Invalid token")
    );
  }
};
