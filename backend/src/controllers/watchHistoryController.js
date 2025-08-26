import { WatchHistory } from "../models/WatchHistory.js";

export async function recordWatch(req, res) {
  try {
    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ message: "Missing movieId" });
    const record = await WatchHistory.create({ userId: req.user.id, movieId });
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getWatchHistory(req, res) {
  try {
    const { userId } = req.params;
    if (req.user.id !== userId) return res.status(403).json({ message: "Forbidden" });
    const items = await WatchHistory.find({ userId }).sort({ watchedAt: -1 }).populate("movieId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

