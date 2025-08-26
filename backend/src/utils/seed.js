import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../config/db.js";
import { Movie } from "../models/Movie.js";
import { User } from "../models/User.js";

dotenv.config();

const demoMovies = [
  {
    title: "Red Horizon",
    description: "A pilot fights against impossible odds.",
    category: "Action",
    duration: 118,
    imageUrl: "https://picsum.photos/seed/red-horizon/600/900",
    rating: 7.4,
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Laugh Lines",
    description: "Stand-up comic finds fame and trouble.",
    category: "Comedy",
    duration: 102,
    imageUrl: "https://picsum.photos/seed/laugh-lines/600/900",
    rating: 6.9,
  },
  {
    title: "Neon City",
    description: "Detective unravels a cyber conspiracy.",
    category: "Popular",
    duration: 124,
    imageUrl: "https://picsum.photos/seed/neon-city/600/900",
    rating: 8.1,
  },
  {
    title: "Quiet Earth",
    description: "After the storm, survival begins.",
    category: "New",
    duration: 95,
    imageUrl: "https://picsum.photos/seed/quiet-earth/600/900",
    rating: 7.0,
  },
  {
    title: "Steel Hearts",
    description: "Two rivals unite in the ring.",
    category: "Action",
    duration: 110,
    imageUrl: "https://picsum.photos/seed/steel-hearts/600/900",
    rating: 7.2,
  },
  {
    title: "Campus Craze",
    description: "Finals week goes hilariously wrong.",
    category: "Comedy",
    duration: 99,
    imageUrl: "https://picsum.photos/seed/campus-craze/600/900",
    rating: 6.8,
  },
  {
    title: "Orbital",
    description: "Rescue mission in deep space.",
    category: "Popular",
    duration: 127,
    imageUrl: "https://picsum.photos/seed/orbital/600/900",
    rating: 8.3,
  },
  {
    title: "First Light",
    description: "Coming-of-age in a seaside town.",
    category: "New",
    duration: 104,
    imageUrl: "https://picsum.photos/seed/first-light/600/900",
    rating: 7.1,
  },
  {
    title: "Double Agent",
    description: "Trust no one in this spy thriller.",
    category: "Action",
    duration: 116,
    imageUrl: "https://picsum.photos/seed/double-agent/600/900",
    rating: 7.6,
  },
  {
    title: "Office Antics",
    description: "Workplace chaos sparks romance.",
    category: "Comedy",
    duration: 97,
    imageUrl: "https://picsum.photos/seed/office-antics/600/900",
    rating: 6.7,
  },
];

async function seed() {
  await connectToDatabase();
  await Movie.deleteMany({});
  await User.deleteMany({});
  const created = await Movie.insertMany(demoMovies);
  const passwordHash = await bcrypt.hash("123456", 10);
  await User.create({ name: "Test User", email: "test@test.com", passwordHash, favorites: [created[0]._id] });
  console.log(`Seeded ${created.length} movies and test user`);
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

