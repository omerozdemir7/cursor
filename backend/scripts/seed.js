import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Movie from "../src/models/Movie.js";
import User from "../src/models/User.js";

dotenv.config();

const movies = [
  { title: "Edge of Tomorrow", description: "A soldier relives the same day.", category: "Action", duration: 113, imageUrl: "https://image.tmdb.org/t/p/w500/uUHvlkLavotfGsNtosDy8ShsIYF.jpg", rating: 7.8, trailerUrl: "https://www.youtube.com/watch?v=vw61gCe2oqI" },
  { title: "The Office", description: "Mockumentary at Dunder Mifflin.", category: "Comedy", duration: 22, imageUrl: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg", rating: 8.9 },
  { title: "Inception", description: "Dream within a dream.", category: "Popular", duration: 148, imageUrl: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg", rating: 8.8, trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0" },
  { title: "Interstellar", description: "Journey through space and time.", category: "Popular", duration: 169, imageUrl: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", rating: 8.6 },
  { title: "Deadpool", description: "A merc with a mouth.", category: "Comedy", duration: 108, imageUrl: "https://image.tmdb.org/t/p/w500/yGSxMiF0cYuAiyuve5DA6bnWEOI.jpg", rating: 8.0 },
  { title: "The Dark Knight", description: "Batman vs Joker.", category: "Action", duration: 152, imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 9.0 },
  { title: "Parasite", description: "Class divide thriller.", category: "New", duration: 132, imageUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", rating: 8.6 },
  { title: "The Mandalorian", description: "A lone gunfighter in the galaxy.", category: "New", duration: 38, imageUrl: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg", rating: 8.7 },
  { title: "John Wick", description: "Revenge of a hitman.", category: "Action", duration: 101, imageUrl: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg", rating: 7.4 },
  { title: "Brooklyn Nine-Nine", description: "Detectives in Brooklyn.", category: "Comedy", duration: 21, imageUrl: "https://image.tmdb.org/t/p/w500/hQU7d0V8GkC1LxmYh7gqIrCAFRH.jpg", rating: 8.2 }
];

async function seed() {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/streambox";
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB for seeding");

  await Movie.deleteMany({});
  await User.deleteMany({});

  const createdMovies = await Movie.insertMany(movies);
  console.log(`Inserted ${createdMovies.length} movies`);

  const passwordHash = await bcrypt.hash("123456", 10);
  const testUser = await User.create({ name: "Test User", email: "test@test.com", passwordHash, favorites: [createdMovies[0]._id, createdMovies[2]._id] });
  console.log(`Created test user: ${testUser.email}`);

  await mongoose.disconnect();
  console.log("Seeding complete");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

