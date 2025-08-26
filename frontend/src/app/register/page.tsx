"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";

export default function RegisterPage() {
  return (
    <AuthProvider>
      <NavBar />
      <RegisterForm />
    </AuthProvider>
  );
}

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(name, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm">
        <h1 className="text-xl font-semibold mb-4">Register</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 dark:focus:ring-orange-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 dark:focus:ring-orange-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 dark:focus:ring-orange-500 outline-none" />
          </div>
          {error && <p className="text-sm text-red-600 dark:text-orange-400">{error}</p>}
          <button disabled={loading} className="w-full rounded-md bg-red-600 dark:bg-orange-500 text-white py-2 text-sm font-medium hover:opacity-90 transition">{loading ? "Creating..." : "Create account"}</button>
        </form>
        <p className="text-sm mt-4 text-zinc-600 dark:text-zinc-400">
          Have an account? <Link href="/login" className="text-red-600 dark:text-orange-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

