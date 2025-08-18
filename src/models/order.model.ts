import mongoose from "mongoose";

export interface TOrder {
  orderItem: mongoose.Schema.Types.ObjectId[];
  address: string;
  totalPrice: number;
  user: mongoose.Schema.Types.ObjectId;
  status: "created" | "paid" | "failed" | "shipped" | "delivered";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paidAt?: Date;
}

const orderSchema = new mongoose.Schema<TOrder>(
  {
    orderItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed", "shipped", "delivered"],
      default: "created",
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<TOrder>("Order", orderSchema);
export default Order;
