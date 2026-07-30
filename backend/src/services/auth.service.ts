import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import type { RegisterInput } from "../validators/auth.validator.js";
import { generateToken } from "../utils/generateToken.js";
import type { LoginInput } from "../validators/auth.validator.js";
import appError from "../utils/appError.js";
import crypto from "crypto";
import { sendVerificationOtp } from "./email.service.js";


export const registerUser = async (data: RegisterInput) => {
  const existingEmail = await User.findOne({ email: data.email });

  if (existingEmail) {
    throw new appError("Email already exists", 400);
  }

  const existingPhone = await User.findOne({
    phoneNumber: data.phoneNumber,
  });

  if (existingPhone) {
    throw new appError("Phone number already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new appError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new appError("Invalid email or password", 401);
  }

  const token = generateToken(user.id);

  const userObject = user.toObject();
  const { password: _, ...userWithoutPassword } = userObject;

  return {
    user: userWithoutPassword,
    token,
  };
};  

export const sendEmailOtp = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new appError("User not found", 404);

  if (user.isVerified) {
    throw new appError("Email is already verified", 400);
  }

  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await user.save();

  await sendVerificationOtp(user.email, otp);

  return { message: "Verification code sent to your email" };
};

export const verifyEmailOtp = async (userId: string, otp: string) => {
  const user = await User.findById(userId);
  if (!user) throw new appError("User not found", 404);

  if (user.isVerified) {
    throw new appError("Email is already verified", 400);
  }

  if (!user.otp || !user.otpExpires) {
    throw new appError("No verification code found. Please request a new one.", 400);
  }

  if (user.otpExpires < new Date()) {
    throw new appError("Verification code has expired", 400);
  }

  if (user.otp !== otp) {
    throw new appError("Invalid verification code", 400);
  }

  // Success
  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const { password: _, otp: __, otpExpires: ___, ...userWithoutSensitive } =
    user.toObject();

  return userWithoutSensitive;
};