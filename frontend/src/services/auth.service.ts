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
  return response.data;
};

export const verifyEmail = async (otp: string) => {
  const response = await api.post("/auth/verify-email", { otp });
  return response.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.patch("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};