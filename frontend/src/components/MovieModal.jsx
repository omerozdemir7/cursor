'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { getUserFromToken } from '@/lib/auth';

export default function MovieModal({ movieId, onClose }) {
	const [movie, setMovie] = useState(null);
	const [busy, setBusy] = useState(false);
	const user = getUserFromToken();

	useEffect(() => {
		if (!movieId) return;
		api.get(`/api/movies/${movieId}`).then((res) => setMovie(res.data));
	}, [movieId]);

	async function addToFavorites() {
		if (!user) return (window.location.href = '/login');
		setBusy(true);
		try {
			await api.post('/api/favorites', { movieId });
			alert('Added to favorites');
		} finally {
			setBusy(false);
		}
	}

	async function play() {
		if (!user) return (window.location.href = '/login');
		setBusy(true);
		try {
			await api.post('/api/watch-history', { movieId });
			if (movie?.trailerUrl) {
				window.open(movie.trailerUrl, '_blank');
			} else {
				alert('Playing... (mock)');
			}
		} finally {
			setBusy(false);
		}
	}

	return (
		<AnimatePresence>
			{movieId && (
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 p-4" onClick={onClose}>
					<motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="mx-auto max-w-xl rounded-lg bg-white p-4 dark:bg-slate-800" onClick={(e) => e.stopPropagation()}>
						{movie ? (
							<div className="space-y-3">
								<h3 className="text-xl font-semibold">{movie.title}</h3>
								<p className="opacity-80">{movie.description}</p>
								<div className="flex gap-4 text-sm opacity-80">
									<span>Duration: {movie.duration}m</span>
									<span>IMDb: {movie.rating}</span>
								</div>
								<div className="flex gap-2 pt-2">
									<button disabled={busy} className="btn btn-accent" onClick={play}>Play</button>
									<button disabled={busy} className="btn" onClick={addToFavorites}>Add to Favorites</button>
									<button className="btn" onClick={onClose}>Close</button>
								</div>
							</div>
						) : (
							<p>Loading...</p>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}