import { Router } from "express";
import {
  getAllProducts,
  getCartProducts,
  getProductById,
} from "../controllers/product.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
const router = Router();
router.get("/", getAllProducts);
router.get("/ids", isAuthenticated, getCartProducts);
router.get("/:id", getProductById);
export default router;
// 689b957ac662b9fb62c59f40
// 689b957ac662b9fb62c59f3e
// 689b957ac662b9fb62c59f46
// 689b957ac662b9fb62c59f45
