import { type InferSchemaType, model, Schema } from "mongoose";

const accountSchema = new Schema(
  {
    ownerType: {
      type: String,
      enum: ["USER", "SYSTEM"],
      required: true,
    },

    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    type: {
      type: String,
      enum: ["WALLET", "CASH", "FEES"],
      required: true,
    },

    currency: {
      type: String,
      default: "NGN",
    },

    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type IAccount = InferSchemaType<typeof accountSchema>;

export default model("Account", accountSchema);
 