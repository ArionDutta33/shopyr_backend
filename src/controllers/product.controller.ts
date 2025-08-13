import { rmSync } from "fs";
import Product from "../models/product.model";
import { ApiError } from "../utils/ApiError";
import { CODES } from "../utils/ErrorCodes";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({});
    if (!products || products.length == 0) {
      throw new ApiError(CODES.NOT_FOUND, "No products found");
    }
    return res
      .status(CODES.OK)
      .json(new ApiResponse(CODES.OK, products, "Products fetched"));
  } catch (error) {
    next(error);
  }
};
