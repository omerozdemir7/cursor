import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.title = { $regex: q, $options: "i" };
    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

