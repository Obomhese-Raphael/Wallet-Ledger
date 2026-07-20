import mongoose from "mongoose";
import LedgerEntry from "../models/LedgerEntry.model.js";

interface DoubleEntryInput {
  transactionId: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
  session?: mongoose.ClientSession;
}

export const createDoubleEntry = async ({
  transactionId,
  fromAccountId,
  toAccountId,
  amount,
  description,
  session,
}: DoubleEntryInput) => {
  const entries = [
    {
      transactionId,
      accountId: fromAccountId,
      type: "debit",
      amount,
      description,
    },
    {
      transactionId,
      accountId: toAccountId,
      type: "credit",
      amount,
      description,
    },
  ];

  if (session) {
    return LedgerEntry.insertMany(entries, { session });
  }

  return LedgerEntry.insertMany(entries);
};
