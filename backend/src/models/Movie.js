import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    duration: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    trailerUrl: { type: String },
  },
  { timestamps: true }
);

export const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

