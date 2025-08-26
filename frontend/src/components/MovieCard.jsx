'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MovieCard({ movie, onClick }) {
	return (
		<motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => onClick?.(movie)} className="card min-w-[180px] cursor-pointer select-none">
			<div className="relative h-60 w-44">
				<Image src={movie.imageUrl} alt={movie.title} fill sizes="176px" className="object-cover" />
			</div>
			<div className="p-2">
				<h3 className="truncate text-sm font-semibold">{movie.title}</h3>
				<p className="line-clamp-2 text-xs opacity-70">{movie.description}</p>
			</div>
		</motion.div>
	);
}