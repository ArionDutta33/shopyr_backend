import { rmSync } from "fs";
import Product from "../models/product.model";
import { ApiError } from "../utils/ApiError";
import { CODES } from "../utils/ErrorCodes";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { log } from "console";
import mongoose from "mongoose";
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find({})
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    const total = await Product.countDocuments();
    if (!products || products.length == 0) {
      throw new ApiError(CODES.NOT_FOUND, "No products found");
    }
    return res
      .status(CODES.OK)
      .json(
        new ApiResponse(
          CODES.OK,
          { products, total, page, totalPages: Math.ceil(total / limit) },
          "Products fetched"
        )
      );
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) throw new ApiError(CODES.NOT_FOUND, "Product not found");
    return res
      .status(CODES.OK)
      .json(new ApiResponse(CODES.OK, product, "Product fetched"));
  } catch (error) {
    next(error);
  }
};
export const getCartProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    log(req.query);
    console.log("in");

    const ids = req.query.ids?.toString().split(",");
    if (!ids || ids.length === 0)
      throw new ApiError(CODES.BAD_REQUEST, "No Ids provided");
    const productByIds = await Product.find({ _id: { $in: ids } });
    console.log("products->", productByIds);
    if (!productByIds || productByIds.length === 0)
      throw new ApiError(CODES.NOT_FOUND, "Products not found");
    return res
      .status(CODES.OK)
      .json(new ApiResponse(CODES.OK, productByIds, "Products fetched"));
  } catch (error) {
    log(error);
    next(error);
  }
};
export const searchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;
    log(query);
    const productByQeury = await Product.aggregate([
      {
        $match: {
          productName: {
            $regex: query,
            $options: "i",
          },
        },
      },
    ]);
    if (!productByQeury || productByQeury.length === 0)
      throw new ApiError(CODES.NOT_FOUND, "Product not found");
    return res.send(productByQeury);
  } catch (error) {
    next(error);
  }
};
