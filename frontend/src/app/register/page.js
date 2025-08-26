'use client';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
	const [name, setName] = useState('Test User');
	const [email, setEmail] = useState('test@test.com');
	const [password, setPassword] = useState('123456');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		setSuccess('');
		try {
			const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
			await axios.post(`${baseURL}/api/auth/register`, { name, email, password });
			setSuccess('Registered! You can now login.');
		} catch (err) {
			setError('Registration failed');
		}
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-6">
			<h1 className="text-2xl font-semibold">Register</h1>
			<form onSubmit={handleSubmit} className="space-y-3">
				<input className="w-full rounded-md border p-2 dark:bg-white/10" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
				<input className="w-full rounded-md border p-2 dark:bg-white/10" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" className="w-full rounded-md border p-2 dark:bg-white/10" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
				{error && <p className="text-red-500">{error}</p>}
				{success && <p className="text-green-600">{success}</p>}
				<button className="btn btn-accent w-full" type="submit">Create account</button>
			</form>
		</main>
	);
}