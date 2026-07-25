import type { Transaction } from "../types/transaction";

export interface Analytics {
  totalDeposits: number;
  totalWithdrawals: number;
  totalTransfers: number;
  totalTransactions: number;
  biggestTransaction: number;
  averageTransaction: number;
}

export function calculateAnalytics(transactions: Transaction[]): Analytics {
  let totalDeposits = 0;
  let totalWithdrawals = 0;
  let totalTransfers = 0;
  let biggestTransaction = 0;

  for (const transaction of transactions) {
    if (transaction.amount > biggestTransaction) {
      biggestTransaction = transaction.amount;
    }

    switch (transaction.type) {
      case "deposit":
      case "transfer_in":
        totalDeposits += transaction.amount;
        break;

      case "withdraw":
      case "transfer_out":
        totalWithdrawals += transaction.amount;
        break;
    }
  }

  // Money sent to another user
  totalTransfers = transactions
    .filter((t) => t.type === "transfer_out")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTransactions = transactions.length;

  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  const averageTransaction =
    totalTransactions === 0 ? 0 : Math.round(totalAmount / totalTransactions);

  return {
    totalDeposits,
    totalWithdrawals,
    totalTransfers,
    totalTransactions,
    biggestTransaction,
    averageTransaction,
  };
}
