import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

console.log("This is the MONGO_URI:", process.env.MONGO_URI);

const app = express();

connectDB();

app.get("/", (_req, res) => {
  res.send("Wallet Ledger API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
