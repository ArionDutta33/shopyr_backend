import { Router } from "express";
import { createOrderFn, verifyPayment } from "../controllers/order.controller";
import Order from "../models/order.model";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router();
router.post("/", isAuthenticated, createOrderFn);
router.get("/", async (req, res) => {
  const orders = await Order.find({});
  return res.status(200).json(orders);
});
router.post("/verify-payment", verifyPayment);
export default router;
