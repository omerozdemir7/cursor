const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const db = require('./db');

const movies = [
  {
    title: 'The Adventure Begins',
    description: 'A group of friends embark on an epic quest.',
    category: 'Popular',
    poster_url: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration_minutes: 92,
  },
  {
    title: 'Laugh Out Loud',
    description: 'A hilarious comedy of errors.',
    category: 'Comedy',
    poster_url: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=500&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    duration_minutes: 105,
  },
  {
    title: 'New Horizons',
    description: 'A sci-fi journey to the edges of the galaxy.',
    category: 'New',
    poster_url: 'https://images.unsplash.com/photo-1505682634904-d7c42167e672?w=500&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration_minutes: 118,
  },
  {
    title: 'Family Ties',
    description: 'A heartfelt drama about family and perseverance.',
    category: 'Drama',
    poster_url: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration_minutes: 97,
  },
  {
    title: 'Action Packed',
    description: 'Non-stop thrills and stunts.',
    category: 'Popular',
    poster_url: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=500&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration_minutes: 110,
  },
  {
    title: 'Comic Relief',
    description: 'A stand-up special that will make you cry laughing.',
    category: 'Comedy',
    poster_url: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=500&q=80',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration_minutes: 60,
  },
];

const existingCount = db.prepare('SELECT COUNT(1) as count FROM movies').get().count;
if (existingCount === 0) {
  const insert = db.prepare('INSERT INTO movies (title, description, category, poster_url, video_url, duration_minutes) VALUES (?, ?, ?, ?, ?, ?)');
  const insertMany = db.transaction((rows) => {
    for (const m of rows) {
      insert.run(m.title, m.description, m.category, m.poster_url, m.video_url, m.duration_minutes);
    }
  });
  insertMany(movies);
  console.log(`Seeded ${movies.length} movies`);
} else {
  console.log(`Movies already seeded (${existingCount})`);
}

