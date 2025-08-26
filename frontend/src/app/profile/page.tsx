"use client";

import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { ApiMovie, apiGet } from "@/lib/api";

function ProfileInner() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<ApiMovie[]>([]);
  const [history, setHistory] = useState<{ _id: string; movieId: ApiMovie; watchedAt: string }[]>([]);

  useEffect(() => {
    if (!user) return;
    apiGet<ApiMovie[]>(`/favorites/${user.id}`).then(setFavorites).catch(() => {});
    apiGet(`/history/${user.id}`).then(setHistory).catch(() => {});
  }, [user]);

  if (!user) return <div className="py-10">Please login to view profile.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="mt-4 grid sm:grid-cols-2 gap-6">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
          <h2 className="font-semibold">User Info</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Name: {user.name}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Email: {user.email}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
          <h2 className="font-semibold mb-2">Favorites</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {favorites.map((m) => (
              <div key={m._id} className="w-40 flex-shrink-0">
                <div className="text-sm font-medium line-clamp-1">{m.title}</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{m.description}</div>
              </div>
            ))}
            {favorites.length === 0 && <p className="text-sm text-zinc-500">No favorites yet.</p>}
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:col-span-2">
          <h2 className="font-semibold mb-2">Watch History</h2>
          <ul className="space-y-2">
            {history.map((h) => (
              <li key={h._id} className="text-sm text-zinc-700 dark:text-zinc-300">
                {h.movieId?.title} — <span className="text-zinc-500">{new Date(h.watchedAt).toLocaleString()}</span>
              </li>
            ))}
            {history.length === 0 && <p className="text-sm text-zinc-500">No watch history yet.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthProvider>
      <NavBar />
      <ProfileInner />
    </AuthProvider>
  );
}

