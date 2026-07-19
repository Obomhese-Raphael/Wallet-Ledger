import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import walletRoutes from "./routes/wallet.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1", routes);
app.use("/api/v1/wallet", walletRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
