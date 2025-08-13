import mongoose from "mongoose";
import { stringify } from "querystring";

export interface TProduct {
  productName: string;
  productImages: string[];
  productPrice: number;
  productDescription: string;
  sizes: string[];
  seller: mongoose.Schema.Types.ObjectId;
}
const productSchema = new mongoose.Schema<TProduct>({
  productName: {
    type: String,
    required: true,
    index: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImages: {
    type: [{ type: String }],
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sizes: {
    type: [{ type: String }],
  },
});
const Product = mongoose.model<TProduct>("Product", productSchema);
export default Product;
