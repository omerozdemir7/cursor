import express from "express";
import { requireAuth } from "../middleware/auth.js";
import WatchHistory from "../models/WatchHistory.js";

const router = express.Router();

router.get("/:userId", requireAuth, async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) return res.status(403).json({ message: "Forbidden" });
    const items = await WatchHistory.find({ userId: req.params.userId }).populate("movieId").sort({ watchedAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { movieId } = req.body;
    const entry = await WatchHistory.create({ userId: req.user.id, movieId });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

