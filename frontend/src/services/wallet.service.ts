import { api } from "../api/axios";

export async function getBalance() {
  const response = await api.get("/wallet/balance");

  return response.data;
}
