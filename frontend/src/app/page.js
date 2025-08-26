"use client";
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import HorizontalRow from '@/components/HorizontalRow';
import MovieModal from '@/components/MovieModal';
import api from '@/lib/api';

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState('');

	useEffect(() => {
		api.get('/api/movies').then((res) => setMovies(res.data));
	}, []);

	const categories = useMemo(() => {
		const cats = ['Popular', 'New', 'Comedy', 'Action'];
		return cats.map((c) => ({
			title: c,
			items: movies.filter((m) => m.category.toLowerCase() === c.toLowerCase()),
		}));
	}, [movies]);

	const filtered = useMemo(() => {
		if (!query) return movies;
		const q = query.toLowerCase();
		return movies.filter((m) => m.title.toLowerCase().includes(q));
	}, [movies, query]);

	return (
		<main className="min-h-screen">
			<header className="flex items-center justify-between p-4">
				<h1 className="text-2xl font-semibold">Movie Stream</h1>
				<nav className="flex items-center gap-3">
					<ThemeToggle />
					<Link href="/login" className="btn btn-accent">Login</Link>
					<Link href="/register" className="btn">Register</Link>
					<Link href="/profile" className="btn">Profile</Link>
				</nav>
			</header>
			<section className="p-4">
				<input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search movies or series" className="w-full max-w-lg rounded-md border border-gray-300 p-2 dark:bg-white/10" />
			</section>
			{query ? (
				<section className="p-4">
					<HorizontalRow title="Search Results" items={filtered} onSelect={(m) => setSelectedId(m._id)} />
				</section>
			) : (
				<section className="space-y-8 p-4">
					{categories.map(({ title, items }) => (
						<HorizontalRow key={title} title={title} items={items} onSelect={(m) => setSelectedId(m._id)} />
					))}
				</section>
			)}
			<MovieModal movieId={selectedId} onClose={() => setSelectedId('')} />
		</main>
	);
}