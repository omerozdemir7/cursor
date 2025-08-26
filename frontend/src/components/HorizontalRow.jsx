'use client';
import MovieCard from './MovieCard';

export default function HorizontalRow({ title, items, onSelect }) {
	return (
		<section className="mb-8">
			<h2 className="mb-3 text-xl font-semibold">{title}</h2>
			<div className="flex gap-4 overflow-x-auto pb-2">
				{items.map((m) => (
					<MovieCard key={m._id} movie={m} onClick={() => onSelect(m)} />
				))}
			</div>
		</section>
	);
}