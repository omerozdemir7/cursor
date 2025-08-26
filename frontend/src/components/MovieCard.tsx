"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { MovieModal } from "./MovieModal";

type Movie = {
  _id: string;
  title: string;
  description: string;
  duration: number;
  imageUrl: string;
  rating: number;
  trailerUrl?: string;
};

export function MovieCard({ movie }: { movie: Movie }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-48 flex-shrink-0">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="relative rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <img src={movie.imageUrl} alt={movie.title} className="h-64 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 hover:opacity-100 transition" />
        <div className="absolute bottom-0 p-2 text-white">
          <div className="font-semibold text-sm line-clamp-1">{movie.title}</div>
          <div className="text-xs opacity-80 line-clamp-2">{movie.description}</div>
        </div>
      </motion.div>
      <MovieModal movie={movie} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

