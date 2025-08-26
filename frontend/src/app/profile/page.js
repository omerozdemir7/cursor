'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { getUserFromToken, requireAuthClient } from '@/lib/auth';
import HorizontalRow from '@/components/HorizontalRow';
import MovieModal from '@/components/MovieModal';

export default function ProfilePage() {
	const [favorites, setFavorites] = useState([]);
	const [history, setHistory] = useState([]);
	const [selectedId, setSelectedId] = useState('');
	const user = getUserFromToken();

	useEffect(() => {
		requireAuthClient();
		if (!user) return;
		api.get(`/api/favorites/${user.id}`).then((res) => setFavorites(res.data));
		api.get(`/api/watch-history/${user.id}`).then((res) => setHistory(res.data.map((i) => i.movieId)));
	}, []);

	return (
		<main className="min-h-screen p-4">
			<h1 className="mb-4 text-2xl font-semibold">Profile</h1>
			<div className="mb-6 rounded-md border p-4 dark:border-white/10">
				<p><span className="opacity-70">User ID:</span> {user?.id}</p>
			</div>
			<div className="space-y-8">
				<HorizontalRow title="Favorites" items={favorites} onSelect={(m) => setSelectedId(m._id)} />
				<HorizontalRow title="Watch History" items={history} onSelect={(m) => setSelectedId(m._id)} />
			</div>
			<MovieModal movieId={selectedId} onClose={() => setSelectedId('')} />
		</main>
	);
}