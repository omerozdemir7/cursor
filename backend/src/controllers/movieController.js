import { Movie } from "../models/Movie.js";

export async function listMovies(req, res) {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: new RegExp(search, "i") };
    const movies = await Movie.find(filter).sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getMovie(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

