'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
	const [dark, setDark] = useState(false);
	useEffect(() => {
		const saved = localStorage.getItem('theme');
		const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
		setDark(isDark);
		if (isDark) document.documentElement.classList.add('dark');
	}, []);
	useEffect(() => {
		if (dark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [dark]);
	return (
		<button className="btn" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
			{dark ? '🌙' : '🌞'}
		</button>
	);
}