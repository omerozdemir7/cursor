const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		passwordHash: { type: String, required: true },
		favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);