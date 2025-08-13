import mongoose from "mongoose";

export interface TUser {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  role: "User" | "Seller";
  phoneNo: number;
}
const userSchema = new mongoose.Schema<TUser>({
  username: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "User",
  },
  phoneNo: {
    type: Number,
  },
});
const User = mongoose.model<TUser>("User", userSchema);
export default User;
