import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectToDatabase } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import favoriteRoutes from "./routes/favorites.js";
import watchHistoryRoutes from "./routes/watchHistory.js";

dotenv.config();

const app = express();

// Basic security and middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Basic rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watch-history", watchHistoryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found", path: req.originalUrl });
});

// Start server
const PORT = process.env.PORT || 4000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database", error);
    process.exit(1);
  });

