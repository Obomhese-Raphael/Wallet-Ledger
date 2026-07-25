import { type InferSchemaType, model, Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    type: {
      type: String,
      enum: ["deposit", "withdraw", "transfer_in", "transfer_out"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },

    reference: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
    recipientName: {
      type: String,
    },

    recipientEmail: {
      type: String,
    },

    senderName: {
      type: String,
    },

    senderEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export type ITransaction = InferSchemaType<typeof transactionSchema>;

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
