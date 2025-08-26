"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { ApiMovie, apiGet, apiPost } from "@/lib/api";

function PlayInner() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
  const [movie, setMovie] = useState<ApiMovie | null>(null);

  useEffect(() => {
    apiGet<ApiMovie>(`/movies/${id}`).then(setMovie).catch(() => {});
    apiPost(`/history`, { movieId: id }).catch(() => {});
  }, [id]);

  if (!movie) return <div className="py-10">Loading...</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold">{movie.title}</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{movie.description}</p>
      <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden bg-black">
        <iframe
          className="w-full h-full"
          src={movie.trailerUrl ? movie.trailerUrl.replace("watch?v=", "embed/") : "https://www.youtube.com/embed/dQw4w9WgXcQ"}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function PlayPage() {
  return (
    <AuthProvider>
      <NavBar />
      <PlayInner />
    </AuthProvider>
  );
}

