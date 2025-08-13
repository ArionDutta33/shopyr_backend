import mongoose from "mongoose";

export interface TOrderItem {
  product: mongoose.Schema.Types.ObjectId;
  price: number;
  quantity: number;
  order: mongoose.Schema.Types.ObjectId;
}
const orderItemSchema = new mongoose.Schema<TOrderItem>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});
const OrderItem = mongoose.model<TOrderItem>("OrderItem", orderItemSchema);
export default OrderItem;
