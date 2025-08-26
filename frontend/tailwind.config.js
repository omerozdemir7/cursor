/**** @type {import('tailwindcss').Config} ****/
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,jsx}',
		'./src/components/**/*.{js,jsx}',
		'./src/app/**/*.{js,jsx}',
	],
	theme: {
		extend: {
			colors: {
				accent: {
					DEFAULT: '#f97316',
					dark: '#ef4444',
				},
			},
		},
	},
	plugins: [],
};