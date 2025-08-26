"use client";

import { useState } from "react";
import { apiDelete, apiPost } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type Props = {
  movieId: string;
  initial?: boolean;
};

export default function FavoriteButton({ movieId, initial = false }: Props) {
  const { isAuthenticated } = useAuth();
  const [isFav, setIsFav] = useState<boolean>(initial);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (!isAuthenticated || busy) return;
    setBusy(true);
    try {
      if (isFav) {
        await apiDelete(`/favorites/${movieId}`);
        setIsFav(false);
      } else {
        await apiPost(`/favorites`, { movieId });
        setIsFav(true);
      }
    } catch {
      // noop
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={!isAuthenticated || busy}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md border text-sm transition ${isFav ? "border-red-600 text-red-600 dark:border-orange-500 dark:text-orange-400" : "border-zinc-300 dark:border-zinc-700"}`}
    >
      {isFav ? "Favorited" : "Add to Favorites"}
    </button>
  );
}

