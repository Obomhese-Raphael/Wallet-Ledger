import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Temporary route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Wallet Ledger API is running",
  });
});

// Version all API routes with /api/v1
app.use("/api/v1", routes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
