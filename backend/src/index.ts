import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import walletRoutes from "./routes/wallet.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-url.onrender.com"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/transactions", transactionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
