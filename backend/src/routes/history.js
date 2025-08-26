const express = require('express');
const { authenticateJwt } = require('../middleware/auth');
const WatchHistory = require('../models/WatchHistory');

const router = express.Router();

router.get('/:userId', authenticateJwt, async (req, res) => {
	try {
		if (req.userId !== req.params.userId) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		const items = await WatchHistory.find({ userId: req.params.userId })
			.populate('movieId')
			.sort({ watchedAt: -1 });
		res.json(items);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/', authenticateJwt, async (req, res) => {
	try {
		const { movieId } = req.body;
		if (!movieId) return res.status(400).json({ message: 'movieId required' });
		const item = await WatchHistory.create({ userId: req.userId, movieId });
		res.status(201).json(item);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;