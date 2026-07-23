import Transaction from "../models/transaction.model.js";

interface HistoryOptions {
  page?: number;
  limit?: number;
  type?: "deposit" | "withdraw" | "transfer";
  reference?: string;
  startDate?: string;
  endDate?: string;
}

export const getTransactionHistory = async (
  accountId: string,
  options: HistoryOptions = {},
) => {
  const { page = 1, limit = 10, type, reference, startDate, endDate } = options;

  const query: any = { accountId };

  // Filter by type
  if (type) {
    query.type = type;
  }

  // Search by reference
  if (reference) {
    query.reference = reference;
  }

  // Filter by date range
  if (startDate || endDate) {
    query.createdAt = {};

    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      query.createdAt.$lte = new Date(endDate);
    }
  }

  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    Transaction.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),

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
