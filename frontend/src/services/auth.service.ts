import { api } from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth";

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await api.post(ENDPOINTS.REGISTER, data);

  return response.data;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post(ENDPOINTS.LOGIN, data);

  return response.data;
};

export const sendVerificationOtp = async () => {
  const response = await api.post("/auth/send-verification-otp");
  console.log("Response on Sending Verification Code: ", response);
  return response.data;
};

export const verifyEmail = async (otp: string) => {
  const response = await api.post("/auth/verify-email", { otp });
  return response.data;
};