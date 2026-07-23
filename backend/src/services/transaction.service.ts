import mongoose from "mongoose";

import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";

import { createDoubleEntry } from "./ledger.service.js";
import { generateReference } from "../utils/generateReference.js";
import { getAccountBalance } from "./balance.service.js";
import User from "../models/user.model.js"

export const depositMoney = async (userId: string, amount: number) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userAccount = await Account.findOne({
      ownerId: userId,
      ownerType: "USER",
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

    // Create double entry
    const createdTransaction = transaction[0];

    if (!createdTransaction) {
      throw new Error("Failed to create transaction");
    }

    // Create double entry
    await createDoubleEntry({
      transactionId: createdTransaction._id.toString(),
      fromAccountId: systemCash._id.toString(),
      toAccountId: userAccount._id.toString(),
      amount,
      description: "Wallet Funding",
      session,
    });

    await session.commitTransaction();

    return createdTransaction;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


export const withdrawMoney = async (userId: string, amount: number) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find the user's wallet account
    const userAccount = await Account.findOne({
      ownerId: userId,
      ownerType: "USER",
      type: "WALLET",
    }).session(session);

    if (!userAccount) {
      throw new Error("Wallet account not found");
    }

    // Find the system cash account
    const systemCash = await Account.findOne({
      ownerType: "SYSTEM",
      type: "CASH",
    }).session(session);

    if (!systemCash) {
      throw new Error("System account not found");
    }

    // Calculate current balance
    const balance = await getAccountBalance(userAccount._id.toString());

    if (balance < amount) {
      throw new Error("Insufficient funds");
    }

    // Create transaction
    const transaction = await Transaction.create(
      [
        {
          accountId: userAccount._id,
          type: "withdraw",
          amount,
          reference: generateReference(),
          status: "completed",
          description: "Wallet Withdrawal",
        },
      ],
      { session },
    );

    // Reverse the ledger entries
    const createdTransaction = transaction[0];

    if (!createdTransaction) {
      throw new Error("Failed to create transaction");
    }

    // Reverse the ledger entries
    await createDoubleEntry({
      transactionId: createdTransaction._id.toString(),
      fromAccountId: userAccount._id.toString(),
      toAccountId: systemCash._id.toString(),
      amount,
      description: "Wallet Withdrawal",
      session,
    });

    await session.commitTransaction();

    return createdTransaction;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


export const transferMoney = async(
  senderId: string,
  recipientEmail: string,
  amount: number,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find the Sender
    const senderAccount = await Account.findOne({
      ownerId: senderId,
      ownerType: "USER",
      type: "WALLET",
    }).session(session);

    if (!senderAccount) {
      throw new Error("Sender's account not found.");
    }

    // Find the recipient
    const recipient = await User.findOne({
      email: recipientEmail,
    }).session(session);

    if (!recipient) {
      throw new Error("Recipient not found");
    }

    // Prevent Self Transfer
    if (recipient._id.toString() === senderId) {
      throw new Error("You cannot transfer to yourself");
    }

    // Find the recipient's wallet account
    const recipientAccount = await Account.findOne({
      ownerId: recipient._id,
      ownerType: "USER",
      type: "WALLET",
    }).session(session);

    if (!recipientAccount) {
      throw new Error("Recipient wallet not found");
    }

    // Check Sender's balance
    const balance = await getAccountBalance(senderAccount._id.toString());

    if (balance < amount) {
      throw new Error("Insufficient Funds.");
    }

    const transaction = await Transaction.create(
      [
        {
          accountId: senderAccount._id,
          type: "transfer",
          amount,
          reference: generateReference(),
          status: "completed",
          description: `Transfer to ${recipient.email}`,
        },
      ],
      { session },
    );

    const createdTransaction = transaction[0];

    if (!createdTransaction) {
      throw new Error("Failed to create transaction");
    }

    await createDoubleEntry({
      transactionId: createdTransaction._id.toString(),
      fromAccountId: senderAccount._id.toString(),
      toAccountId: recipientAccount._id.toString(),
      amount,
      description: `Transfer to ${recipient.email}`,
      session,
    });

    await session.commitTransaction();
    return createdTransaction;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}