import { Response, Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { CODES } from "../utils/ErrorCodes";
import OrderItem from "../models/orderItem.model";
import Order from "../models/order.model";
import { ApiResponse } from "../utils/ApiResponse";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length == 0) {
      return new ApiError(CODES.NOT_FOUND, "No products added");
    }

    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    const newOrder = await Order.create({
      orderItem: [],
      totalPrice: totalPrice,
    });

    const orderItemIds = [];
    for (const item of items) {
      const newOrderItems = await OrderItem.create({
        order: newOrder._id,
        product: item.product,
        price: item.price,
        quantity: item.quantity,
      });
      orderItemIds.push(newOrderItems._id);
    }
    newOrder.set("orderItem", orderItemIds);
    newOrder.save();
    return res
      .status(CODES.CREATED)
      .json(new ApiResponse(CODES.CREATED, newOrder, "Order created"));
  } catch (error) {
    next(error);
  }
};
