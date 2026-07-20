import { type InferSchemaType, model, Schema } from "mongoose";

const ledgerEntrySchema = new Schema(
  {
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },

    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    type: {
      type: String,
      enum: ["debit", "credit"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "NGN",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export type ILedgerEntry = InferSchemaType<typeof ledgerEntrySchema>;

const LedgerEntry = model("LedgerEntry", ledgerEntrySchema);

export default LedgerEntry;
