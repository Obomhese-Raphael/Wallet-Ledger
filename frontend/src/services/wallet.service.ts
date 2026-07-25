import { api } from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export interface DepositRequest {
  amount: number;
}

export interface WithdrawRequest {
  amount: number;
}

export interface TransferRequest {
  recipientEmail: string;
  amount: number;
  description?: string;
}

export interface BalanceResponse {
  success: boolean;
  message: string;
  data: number;
}

export const deposit = async (data: DepositRequest) => {
  const response = await api.post(ENDPOINTS.DEPOSIT, data);

  return response.data;
};

export const withdraw = async (data: WithdrawRequest) => {
  const response = await api.post(ENDPOINTS.WITHDRAW, data);

  return response.data;
};

export const transfer = async (data: TransferRequest) => {
  const response = await api.post(ENDPOINTS.TRANSFER, data);

  return response.data;
};

export const getBalance = async (): Promise<BalanceResponse> => {
  const response = await api.get(ENDPOINTS.BALANCE);

  return response.data;
};