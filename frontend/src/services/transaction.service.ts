import { api } from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

import type { TransactionsResponse } from "../types/transaction";

export const getTransactions = async (): Promise<TransactionsResponse> => {
  const response = await api.get(ENDPOINTS.HISTORY);

  return response.data;
};