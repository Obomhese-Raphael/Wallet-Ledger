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
