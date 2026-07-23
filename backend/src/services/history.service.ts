import Transaction from "../models/transaction.model.js";
import LedgerEntry from "../models/LedgerEntry.model.js";

interface HistoryOptions {
  accountId: string;
  page?: number;
  limit?: number;
  type?: "deposit" | "withdraw" | "transfer";
  reference?: string;
  startDate?: string;
  endDate?: string;
  sort?: "newest" | "oldest";
}

export const getTransactionHistory = async ({
  accountId,
  page = 1,
  limit = 10,
  type,
  reference,
  startDate,
  endDate,
  sort = "newest",
}: HistoryOptions) => {
  const query: Record<string, unknown> = {
    accountId,
  };

  if (type) {
    query.type = type;
  }

  if (reference) {
    query.reference = reference;
  }

  if (startDate || endDate) {
    query.createdAt = {};

    if (startDate) {
      (query.createdAt as Record<string, Date>).$gte = new Date(startDate);
    }

    if (endDate) {
      (query.createdAt as Record<string, Date>).$lte = new Date(endDate);
    }
  }

  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    Transaction.find(query)
      .sort({
        createdAt: sort === "oldest" ? 1 : -1,
      })
      .skip(skip)
      .limit(limit),

    Transaction.countDocuments(query),
  ]);

  return {
    transactions,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTransactionDetails = async (
  transactionId: string,
  accountId: string,
) => {
  const transaction = await Transaction.findOne({
    _id: transactionId,
    accountId,
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  const ledgerEntries = await LedgerEntry.find({
    transactionId,
  }).populate("accountId", "name type ownerType");

  return {
    transaction,
    ledgerEntries,
  };
};
