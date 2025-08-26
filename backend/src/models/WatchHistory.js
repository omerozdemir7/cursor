const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
		watchedAt: { type: Date, required: true, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('WatchHistory', watchHistorySchema);