import mongoose from "mongoose";

import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";

import { createDoubleEntry } from "./ledger.service.js";
import { generateReference } from "../utils/generateReference.js";

export const depositMoney = async (userId: string, amount: number) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userAccount = await Account.findOne({
      ownerId: userId,
      type: "WALLET",
    }).session(session);

    if (!userAccount) {
      throw new Error("Wallet account not found");
    }

    const systemCash = await Account.findOne({
      ownerType: "SYSTEM",
      type: "CASH",
    }).session(session);

    if (!systemCash) {
      throw new Error("System account not found");
    }

    const transaction = await Transaction.create(
      [
        {
          accountId: userAccount._id,
          type: "deposit",
          amount,
          reference: generateReference(),
          status: "completed",
          description: "Wallet Funding",
        },
      ],
      { session },
    );

    await createDoubleEntry({
      transactionId: transaction[0]._id.toString(),
      fromAccountId: systemCash._id.toString(),
      toAccountId: userAccount._id.toString(),
      amount,
      description: "Wallet Funding",
      session,
    });

    await session.commitTransaction();

    return transaction[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
