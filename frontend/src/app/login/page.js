'use client';
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
	const [email, setEmail] = useState('test@test.com');
	const [password, setPassword] = useState('123456');
	const [error, setError] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		try {
			const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
			const res = await axios.post(`${baseURL}/api/auth/login`, { email, password }, { withCredentials: true });
			localStorage.setItem('token', res.data.token);
			window.location.href = '/';
		} catch (err) {
			setError('Invalid credentials');
		}
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-6">
			<h1 className="text-2xl font-semibold">Login</h1>
			<form onSubmit={handleSubmit} className="space-y-3">
				<input className="w-full rounded-md border p-2 dark:bg-white/10" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" className="w-full rounded-md border p-2 dark:bg-white/10" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
				{error && <p className="text-red-500">{error}</p>}
				<button className="btn btn-accent w-full" type="submit">Sign in</button>
			</form>
		</main>
	);
}