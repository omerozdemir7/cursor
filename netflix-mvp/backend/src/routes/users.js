const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const userStmt = db.prepare('SELECT id FROM users WHERE email = ?');
  const existing = userStmt.get(email);
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const insertStmt = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
  const info = insertStmt.run(email, passwordHash);
  return res.status(201).json({ id: info.lastInsertRowid, email });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  const getStmt = db.prepare('SELECT id, email, password_hash FROM users WHERE email = ?');
  const user = getStmt.get(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
  return res.json({ token, user: { id: user.id, email: user.email } });
});

module.exports = router;

