const jwt = require('jsonwebtoken');

function authenticateJwt(req, res, next) {
	try {
		const authHeader = req.headers['authorization'];
		const bearerToken = authHeader && authHeader.startsWith('Bearer ')
			? authHeader.substring('Bearer '.length)
			: null;
		const token = bearerToken || (req.cookies && req.cookies.token);
		if (!token) {
			return res.status(401).json({ message: 'Authentication token missing' });
		}
		const secret = process.env.JWT_SECRET;
		if (!secret) {
			return res.status(500).json({ message: 'JWT secret not configured' });
		}
		const payload = jwt.verify(token, secret);
		req.userId = payload.userId;
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
}

module.exports = { authenticateJwt };