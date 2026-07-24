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
        totalDeposits += transaction.amount;
        break;

      case "withdraw":
        totalWithdrawals += transaction.amount;
        break;

      case "transfer":
        totalTransfers += transaction.amount;
        break;
    }
  }

  const totalTransactions = transactions.length;

  const totalAmount = totalDeposits + totalWithdrawals + totalTransfers;

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