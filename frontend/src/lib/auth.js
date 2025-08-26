import jwtDecode from 'jwt-decode';

export function getToken() {
	if (typeof window === 'undefined') return '';
	return localStorage.getItem('token') || '';
}

export function getUserFromToken() {
	try {
		const token = getToken();
		if (!token) return null;
		const decoded = jwtDecode(token);
		return { id: decoded.userId };
	} catch {
		return null;
	}
}

export function requireAuthClient() {
	const user = getUserFromToken();
	if (!user) {
		if (typeof window !== 'undefined') window.location.href = '/login';
	}
	return user;
}