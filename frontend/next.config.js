/**** @type {import('next').NextConfig} ****/
const nextConfig = {
	images: {
		domains: ['picsum.photos', 'img.youtube.com'],
	},
	experimental: { appDir: true },
};

module.exports = nextConfig;