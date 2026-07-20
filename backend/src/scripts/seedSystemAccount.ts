import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Account from "../models/account.model.js";

dotenv.config();

await connectDB();

const exists = await Account.findOne({
  ownerType: "SYSTEM",
  type: "CASH",
});

if (!exists) {
  await Account.create({
    ownerType: "SYSTEM",
    ownerId: new mongoose.Types.ObjectId(),
    type: "CASH",
    name: "System Cash",
  });

  console.log("✅ System Cash Account Created");
} else {
  console.log("✅ System Cash Already Exists");
}

process.exit();
