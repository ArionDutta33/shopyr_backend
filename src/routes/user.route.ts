import { Router } from "express";
import {
  changePassword,
  login,
  registerUser,
  requestOtp,
  verifyOtp,
} from "../controllers/user.controller";
const router = Router();
router.post("/register", registerUser);
router.post("/login", login);
router.post("/password/change", changePassword);
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
export default router;
