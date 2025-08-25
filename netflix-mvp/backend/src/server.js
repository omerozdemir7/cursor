const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Initialize DB (creates tables)
require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const auth = require('./middleware/auth');

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/users', usersRouter);
app.use('/movies', auth, moviesRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

