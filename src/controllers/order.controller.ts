import { Response, Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { CODES } from "../utils/ErrorCodes";
import OrderItem, { TOrderItem } from "../models/orderItem.model";
import Order from "../models/order.model";
import { ApiResponse } from "../utils/ApiResponse";
import crypto from "crypto";
import Razorpay from "razorpay";
import mongoose, { Types } from "mongoose";
import { log } from "console";
interface AuthenticatedRequest<
  Params = {},
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: JwtPayload;
}
interface JwtPayload {
  userId: string;
  email: string;
  role: "User" | "Seller";
  iat: Date;
  exp: Date;
}

interface CustomerOrder {
  items: TOrderItem[];
  address: string;
}

export const createOrderFn = async (
  req: AuthenticatedRequest<{}, {}, CustomerOrder, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { items, address } = req.body;
    log(req.body);
    const userId = req.user?.userId;
    if (!items || items.length === 0 || !address)
      throw new ApiError(CODES.BAD_REQUEST, "No items or no address found ");
    let totalPrice: number = 0;
    for (let item of items) {
      totalPrice += item.price * item.quantity;
    }
    log(totalPrice);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      receipt: `order_rcpt_${Date.now()}`,
    });

    const newOrder = await Order.create({
      address: address,
      orderItem: [],
      razorpayOrderId: razorpayOrder.id,
      status: "created",
      user: userId,
      totalPrice: totalPrice,
    });
    const orderItemIds: Types.ObjectId[] = [];
    for (let item of items) {
      const newOrderItem = await OrderItem.create({
        order: newOrder._id,
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
      });
      orderItemIds.push(newOrderItem._id);
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      newOrder._id,
      {
        $set: {
          orderItem: orderItemIds,
          razorpayOrderId: razorpayOrder.id,
        },
      },
      { new: true }
    )
      .populate("orderItem")
      .populate("user");
    return res
      .status(CODES.CREATED)
      .json(new ApiResponse(CODES.CREATED, updatedOrder, "Order created"));
  } catch (error) {
    console.log("error->", error);

    next(error);
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const hmac = crypto.createHmac("sha256", "zVYbIMgjEMpUuDWJ7w6wbJul");
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: "paid",
          razorpayPaymentId: razorpay_payment_id,
          paidAt: new Date(),
        }
      );

      return res.json({ success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Signature mismatch" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
};
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
