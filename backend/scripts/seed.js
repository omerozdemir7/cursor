require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectToDatabase } = require('../src/config/db');
const Movie = require('../src/models/Movie');
const User = require('../src/models/User');

async function run() {
	await connectToDatabase(process.env.MONGODB_URI);

	const movies = [
		{ title: 'Edge of Action', description: 'Explosive action thriller.', category: 'Action', duration: 124, imageUrl: 'https://picsum.photos/seed/action1/600/900', rating: 7.8, trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
		{ title: 'Laugh Lines', description: 'Feel-good comedy.', category: 'Comedy', duration: 98, imageUrl: 'https://picsum.photos/seed/comedy1/600/900', rating: 7.1 },
		{ title: 'New Wave', description: 'Fresh indie drama.', category: 'New', duration: 112, imageUrl: 'https://picsum.photos/seed/new1/600/900', rating: 7.4 },
		{ title: 'Star Voyage', description: 'Epic space odyssey.', category: 'Popular', duration: 140, imageUrl: 'https://picsum.photos/seed/pop1/600/900', rating: 8.5 },
		{ title: 'Crimson Night', description: 'Mystery thriller.', category: 'Popular', duration: 107, imageUrl: 'https://picsum.photos/seed/pop2/600/900', rating: 8.1 },
		{ title: 'Punchline', description: 'Stand-up special.', category: 'Comedy', duration: 60, imageUrl: 'https://picsum.photos/seed/comedy2/600/900', rating: 6.9 },
		{ title: 'Rapid Fire', description: 'High-speed chase.', category: 'Action', duration: 105, imageUrl: 'https://picsum.photos/seed/action2/600/900', rating: 7.6 },
		{ title: 'Sunset Boulevard', description: 'Romantic drama.', category: 'New', duration: 115, imageUrl: 'https://picsum.photos/seed/new2/600/900', rating: 7.3 },
		{ title: 'Undercover', description: 'Spy thriller.', category: 'Action', duration: 122, imageUrl: 'https://picsum.photos/seed/action3/600/900', rating: 7.7 },
		{ title: 'Comic Relief', description: 'Family comedy.', category: 'Comedy', duration: 92, imageUrl: 'https://picsum.photos/seed/comedy3/600/900', rating: 7.0 },
	];

	await Movie.deleteMany({});
	const inserted = await Movie.insertMany(movies);

	const email = 'test@test.com';
	const passwordHash = await bcrypt.hash('123456', 10);
	await User.deleteMany({ email });
	const user = await User.create({ name: 'Test User', email, passwordHash, favorites: [inserted[0]._id] });

	// eslint-disable-next-line no-console
	console.log(`Seeded ${inserted.length} movies and user ${user.email}`);
	await mongoose.disconnect();
}

run().catch((err) => {
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
});