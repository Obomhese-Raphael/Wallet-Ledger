import Transaction from "../models/transaction.model.js";

export const getTransactionHistory = async (accountId: string) => {
  return Transaction.find({
    accountId,
  }).sort({
    createdAt: -1,
  });
};
