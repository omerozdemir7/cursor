"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ApiMovie } from "@/lib/api";

type Props = {
  movie: ApiMovie;
  onClick?: (movie: ApiMovie) => void;
};

export default function MovieCard({ movie, onClick }: Props) {
  return (
    <motion.button
      onClick={() => onClick?.(movie)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative group w-44 sm:w-48 lg:w-56 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-left"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={movie.imageUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-1">{movie.title}</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1">{movie.description}</p>
      </div>
    </motion.button>
  );
}

