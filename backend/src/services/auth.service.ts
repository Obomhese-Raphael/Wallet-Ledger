import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import appError from "../utils/AppError.js";
import type { RegisterInput } from "../validators/auth.validator.js";
import AppError from "../utils/AppError.js";
import { generateToken } from "../utils/generateToken.js";
import type { LoginInput } from "../validators/auth.validator.js";

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
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user.id);

  const userObject = user.toObject();
  const { password: _, ...userWithoutPassword } = userObject;

  return {
    user: userWithoutPassword,
    token,
  };
};  