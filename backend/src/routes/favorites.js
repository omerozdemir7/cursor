const express = require('express');
const { authenticateJwt } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/:userId', authenticateJwt, async (req, res) => {
	try {
		if (req.userId !== req.params.userId) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		const user = await User.findById(req.params.userId).populate('favorites');
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.json(user.favorites);
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

router.post('/', authenticateJwt, async (req, res) => {
	try {
		const { movieId } = req.body;
		if (!movieId) return res.status(400).json({ message: 'movieId required' });
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).json({ message: 'User not found' });
		if (!user.favorites.find((id) => id.toString() === movieId)) {
			user.favorites.push(movieId);
			await user.save();
		}
		res.status(201).json({ success: true });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

router.delete('/:id', authenticateJwt, async (req, res) => {
	try {
		const movieId = req.params.id;
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).json({ message: 'User not found' });
		user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
		await user.save();
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
});

module.exports = router;