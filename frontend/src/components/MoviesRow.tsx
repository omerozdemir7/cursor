"use client";

import { useEffect, useState } from "react";
import { ApiMovie, apiGet } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

type Props = {
  title: string;
  query?: string;
  category?: string;
  onSelect: (movie: ApiMovie) => void;
};

export default function MoviesRow({ title, category, query, onSelect }: Props) {
  const [movies, setMovies] = useState<ApiMovie[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (query) params.set("q", query);
    apiGet<ApiMovie[]>(`/movies${params.toString() ? `?${params}` : ""}`)
      .then(setMovies)
      .catch(() => {})
    return () => controller.abort();
  }, [category, query]);

  if (movies.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {movies.map((m) => (
          <MovieCard key={m._id} movie={m} onClick={onSelect} />
        ))}
      </div>
    </section>
  );
}

