import './globals.css';

export const metadata = {
	title: 'Movie Stream MVP',
	description: 'Browse and watch trailers',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				{children}
			</body>
		</html>
	);
}