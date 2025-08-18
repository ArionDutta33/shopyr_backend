import e, { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { CODES } from "../utils/ErrorCodes";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../services/hashPassword";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";
import { token } from "morgan";
import Redis from "ioredis";
import { generateOTP } from "../services/otpService";
import { sendMail } from "../services/mailService";
import { generateOtpEmail } from "../utils/generateOtpEmail";
import { redis } from "../services/redisService";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("in");

    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(CODES.BAD_REQUEST, "All fields are required");
    }
    const alreadyRegistered = await User.findOne({ email: email });
    if (alreadyRegistered) {
      throw new ApiError(CODES.BAD_REQUEST, "Already registered!");
    }
    const newHashedPassword = await hashPassword(password);
    await User.create({
      email: email,
      password: newHashedPassword,
    });
    console.log(newHashedPassword);

    return res
      .status(CODES.CREATED)
      .json(new ApiResponse(CODES.CREATED, {}, "User registered"));
  } catch (error) {
    next(error);
  }
};
export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    console.log(req.body);
    if (!email || !otp) {
      throw new ApiError(CODES.UNAUTHORIZED, "Invalid OTP");
    }
    const storedOtp = await redis.get(email);
    if (!storedOtp) throw new ApiError(CODES.UNAUTHORIZED, "Otp Expired");

    if (parseInt(JSON.parse(storedOtp)) !== otp)
      throw new ApiError(CODES.UNAUTHORIZED, "Unauthorized");
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(CODES.NOT_FOUND, "Not found");
    user.isActive = true;
    await user.save();
    await redis.del(email);
    return res
      .status(CODES.OK)
      .json(new ApiResponse(CODES.OK, {}, "Otp verified"));
  } catch (error) {
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(CODES.BAD_REQUEST, "Invalid credentials");
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      throw new ApiError(CODES.BAD_REQUEST, "Register first");
    }
    let isMath;
    isMath = await comparePassword(password, existingUser.password);
    if (!isMath) {
      throw new ApiError(CODES.UNAUTHORIZED, "Invalid credentials");
    }
    const payload = {
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };
    const authToken = jwt.sign(payload, "secret", { expiresIn: "1h" });
    const response = { authToken: authToken, email: existingUser.email };
    return res
      .status(CODES.OK)
      .json(new ApiResponse(CODES.OK, response, "Loggin success!"));
  } catch (error) {
    next(error);
  }
};
export const requestOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const otp = generateOTP(4);
    redis.set(email, JSON.stringify(otp), "EX", 1800);
    await sendMail(email, "OTP verification", generateOtpEmail(otp));
    return res.status(CODES.OK).json(new ApiResponse(CODES.OK, {}, "Otp sent"));
  } catch (error) {
    next(error);
  }
};
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, email } = req.body;
    const user = await User.findOne({ email });
    let isMatch;
    if (!user) throw new ApiError(CODES.NOT_FOUND, "User not found");
    isMatch = await comparePassword(newPassword, user.password);
    if (!isMatch) throw new ApiError(CODES.UNAUTHORIZED, "Unauthorized");
    const hashNewPassword = await hashPassword(newPassword);
    user.set("password", hashNewPassword);
    return res
      .status(CODES.OK)
      .json(new ApiResponse(CODES.OK, {}, "Password changed successfully"));
  } catch (error) {
    next(error);
  }
};
