import { api } from "../api/axios";
import type { TransactionsResponse } from "../types/transaction";

export async function getTransactions(): Promise<TransactionsResponse> {
  const response = await api.get("/transactions");

  return response.data;
}
