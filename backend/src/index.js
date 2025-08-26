import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import favoriteRoutes from "./routes/favorites.js";
import historyRoutes from "./routes/history.js";

dotenv.config();

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/streambox";
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});

