import { Response, Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { CODES } from "../utils/ErrorCodes";
import OrderItem from "../models/orderItem.model";
import Order from "../models/order.model";
import Product from "../models/product.model";
import { ApiResponse } from "../utils/ApiResponse";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: "User" | "Seller";
  iat: Date;
  exp: Date;
}

export const createOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items, address } = req.body;

    // ✅ Validate request data
    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(new ApiError(CODES.NOT_FOUND, "No products added"));
    }
    if (!address) {
      return next(new ApiError(CODES.BAD_REQUEST, "Address is required"));
    }

    // ✅ Step 1: Create the order first
    const order = await Order.create({
      orderItem: [],
      user: req.user?.userId,
      address,
      totalPrice: 0,
    });

    let totalPrice = 0;
    const orderItemIds: string[] = [];

    // ✅ Step 2: Create order items with order ID set
    for (const item of items) {
      const productData = await Product.findById(item.product);
      if (!productData) {
        return next(
          new ApiError(CODES.NOT_FOUND, `Product not found: ${item.product}`)
        );
      }

      const price = productData.productPrice;
      totalPrice += price * item.quantity;

      const newOrderItem = await OrderItem.create({
        product: productData._id,
        order: order._id,
        price,
        quantity: item.quantity,
        size: item.size,
      });

      orderItemIds.push(newOrderItem._id.toString());
    }

    // ✅ Step 3: Update order with items and total price
    await Order.findByIdAndUpdate(order._id, {
      orderItem: orderItemIds,
      totalPrice,
    });

    // ✅ Step 4: Populate and return
    const populatedOrder = await Order.findById(order._id).populate({
      path: "orderItem",
      populate: { path: "product" },
    });

    return res
      .status(CODES.CREATED)
      .json(new ApiResponse(CODES.CREATED, populatedOrder, "Order created"));
  } catch (error) {
    next(error);
  }
};
