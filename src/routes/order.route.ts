import { Router } from "express";
import { createOrder } from "../controllers/order.controller";
import Order from "../models/order.model";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router();
router.post("/", isAuthenticated, createOrder);
router.get("/", async (req, res) => {
  const orders = await Order.find({});
  return res.status(200).json(orders);
});
export default router;
