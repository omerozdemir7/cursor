import { User } from "../models/User.js";

export async function addFavorite(req, res) {
  try {
    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ message: "Missing movieId" });
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: movieId } },
      { new: true }
    ).populate("favorites");
    res.status(201).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function removeFavorite(req, res) {
  try {
    const { id } = req.params; // favorite movie id
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: id } },
      { new: true }
    ).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getFavorites(req, res) {
  try {
    const { userId } = req.params;
    if (req.user.id !== userId) return res.status(403).json({ message: "Forbidden" });
    const user = await User.findById(userId).populate("favorites");
    res.json(user?.favorites || []);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

