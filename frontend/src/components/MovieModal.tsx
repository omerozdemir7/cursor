"use client";
import { motion, AnimatePresence } from "framer-motion";

type Movie = {
  _id: string;
  title: string;
  description: string;
  duration: number;
  imageUrl: string;
  rating: number;
  trailerUrl?: string;
};

export function MovieModal({ movie, open, onClose }: { movie: Movie | null; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && movie && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative max-w-3xl w-[92vw] md:w-[800px] bg-white dark:bg-black rounded-lg overflow-hidden shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="aspect-video bg-black">
              {movie.trailerUrl ? (
                <iframe
                  className="w-full h-full"
                  src={movie.trailerUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <img src={movie.imageUrl} alt={movie.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <button onClick={onClose} className="text-sm opacity-70 hover:opacity-100">Close</button>
              </div>
              <p className="opacity-80 text-sm">{movie.description}</p>
              <div className="flex gap-4 text-sm">
                <span>Duration: {movie.duration} min</span>
                <span>IMDb: {movie.rating.toFixed(1)}</span>
              </div>
              <button className="mt-2 inline-flex items-center gap-2 rounded px-4 py-2 text-sm text-white bg-[rgb(var(--accent))] hover:opacity-90 transition">
                Play
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

