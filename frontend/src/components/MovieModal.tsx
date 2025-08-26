"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ApiMovie } from "@/lib/api";
import FavoriteButton from "@/components/FavoriteButton";
import Link from "next/link";

type Props = {
  movie: ApiMovie | null;
  onClose: () => void;
};

export default function MovieModal({ movie, onClose }: Props) {
  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 shadow-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{movie.description}</p>
              </div>
              <button onClick={onClose} className="px-2 py-1 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800">✕</button>
            </div>
            <div className="mt-4 text-sm grid grid-cols-2 gap-4">
              <div>
                <span className="text-zinc-500">Duration:</span> {movie.duration} min
              </div>
              <div>
                <span className="text-zinc-500">IMDb:</span> {movie.rating}
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <Link href={`/play/${movie._id}`} className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-red-600 dark:bg-orange-500 text-white text-sm font-medium hover:opacity-90">Play</Link>
              {movie.trailerUrl && (
                <a href={movie.trailerUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Trailer</a>
              )}
              <FavoriteButton movieId={movie._id} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

