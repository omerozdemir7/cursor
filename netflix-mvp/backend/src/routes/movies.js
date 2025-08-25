const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const stmt = db.prepare('SELECT * FROM movies ORDER BY created_at DESC');
  const movies = stmt.all();
  res.json(movies);
});

router.get('/:id', (req, res) => {
  const stmt = db.prepare('SELECT * FROM movies WHERE id = ?');
  const movie = stmt.get(req.params.id);
  if (!movie) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(movie);
});

module.exports = router;

