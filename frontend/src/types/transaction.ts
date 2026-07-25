export interface Transaction {
  _id: string;
  accountId: string;
  type: "deposit" | "withdraw" | "transfer_in" | "transfer_out";
  amount: number;
  status: "completed" | "pending" | "failed";
  reference: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  success: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
