require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const { connectToDatabase } = require('./config/db');

const authRouter = require('./routes/auth');
const moviesRouter = require('./routes/movies');
const favoritesRouter = require('./routes/favorites');
const historyRouter = require('./routes/history');

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
	? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
	: ['http://localhost:3000'];

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 });
app.use(limiter);

app.get('/api/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/watch-history', historyRouter);

app.use((req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
	// eslint-disable-next-line no-console
	console.error('Unhandled error:', err);
	res.status(500).json({ message: 'Internal Server Error' });
});

const port = Number(process.env.PORT || 4000);
connectToDatabase(process.env.MONGODB_URI)
	.then(() => {
		app.listen(port, () => {
			// eslint-disable-next-line no-console
			console.log(`API server running on http://localhost:${port}`);
		});
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.error('Failed to connect to database:', err);
		process.exit(1);
	});