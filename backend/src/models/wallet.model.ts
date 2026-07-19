import { Schema, model, Types, type InferSchemaType } from "mongoose";

const walletSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    currency: {
      type: String,
      default: "NGN",
      enum: ["NGN"],
    },
  },
  {
    timestamps: true,
  },
);

export type IWallet = InferSchemaType<typeof walletSchema>;

const Wallet = model("Wallet", walletSchema);

export default Wallet;
