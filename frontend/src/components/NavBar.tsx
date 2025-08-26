"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q.length > 0) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-semibold text-red-600 dark:text-orange-400">StreamBox</Link>
          <form onSubmit={onSearch} className="hidden md:flex items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies or series"
              className="ml-4 w-72 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-orange-500"
            />
          </form>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link href="/profile" className="text-sm text-zinc-900 dark:text-zinc-100 hover:underline">{user?.name}</Link>
              <button onClick={logout} className="text-sm text-red-600 dark:text-orange-400 hover:underline">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-sm hover:underline">Login</Link>
              <Link href="/register" className="text-sm hover:underline">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

