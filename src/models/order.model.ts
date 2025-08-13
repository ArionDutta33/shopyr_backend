import mongoose from "mongoose";

export interface TOrder {
  orderItem: mongoose.Schema.Types.ObjectId;
  totalPrice: number;
}
const orderSchema = new mongoose.Schema<TOrder>({
  orderItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});
const Order = mongoose.model<TOrder>("Order", orderSchema);
export default Order;
