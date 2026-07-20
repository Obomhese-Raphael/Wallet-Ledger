import LedgerEntry from "../models/LedgerEntry.model.js";

export const getAccountBalance = async (accountId: string) => {
  const entries = await LedgerEntry.find({
    accountId,
  });

  let balance = 0;

  for (const entry of entries) {
    if (entry.type === "credit") {
      balance += entry.amount;
    } else {
      balance -= entry.amount;
    }
  }

  return balance;
};
