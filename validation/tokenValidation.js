const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(400).send('Access denied');
    try {
        req.user = jwt.verify(token, process.env.TOKEN);
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

module.exports.auth = auth;
