"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import MoviesRow from "@/components/MoviesRow";
import MovieModal from "@/components/MovieModal";
import { ApiMovie } from "@/lib/api";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [selected, setSelected] = useState<ApiMovie | null>(null);

  return (
    <AuthProvider>
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl font-semibold mb-4">Search results for "{q}"</h1>
        <MoviesRow title="Results" query={q} onSelect={setSelected} />
      </div>
      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </AuthProvider>
  );
}

