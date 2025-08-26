import express from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", requireAuth, async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) return res.status(403).json({ message: "Forbidden" });
    const user = await User.findById(req.params.userId).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.favorites.some((id) => id.toString() === movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const movieId = req.params.id;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
    await user.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

