"use client";
import useSWR from "swr";
import { MovieCard } from "./MovieCard";

const fetcher = async (url: string) => {
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export function CategoryRow({ title, category }: { title: string; category: string }) {
  const { data, error } = useSWR(`/api/movies?category=${encodeURIComponent(category)}`, fetcher);

  return (
    <section>
      <h2 className="mb-3 font-semibold text-lg">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {error && <div className="text-red-600">Failed to load</div>}
        {!data && !error && <div>Loading…</div>}
        {Array.isArray(data) && data.map((m: any) => <MovieCard key={m._id} movie={m} />)}
      </div>
    </section>
  );
}

