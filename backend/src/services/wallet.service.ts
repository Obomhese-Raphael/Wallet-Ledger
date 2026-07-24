import Wallet from "../models/wallet.model.js";

export const createWallet = async (userId: string) => {
  return await Wallet.create({
    userId,
  });
};

export const getWalletByUserId = async (userId: string) => { 
    return await Wallet.findOne({ userId });
}

