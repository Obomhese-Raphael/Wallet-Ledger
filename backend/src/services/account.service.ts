import Account from "../models/account.model.js";

export const createAccount = async (data: {
  ownerType: "USER" | "SYSTEM";
  ownerId: string;
  type: "WALLET" | "CASH" | "FEES";
  currency?: string;
  name: string;
}) => {
  return Account.create(data);
};

export const getAccountByOwner = async (
  ownerId: string,
  type: "WALLET" | "CASH" | "FEES",
) => {
  return Account.findOne({
    ownerId,
    type,
  });
};
