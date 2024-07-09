const util = require('util');
const db = require('../db');
const jwt = require('jsonwebtoken');

const protect = async function(req, res, next) {
    let token;

    const query = util.promisify(db.query).bind(db);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            const search = await query("SELECT user_id, username, email, created_at FROM users WHERE user_id = ?", [decoded.id]);

            if (search.length > 0) {
                req.user = search[0];
                return next();
            } else {
                return res.status(401).json({ message: "Not Authorized" });
            }
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Not Authorized" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not Authorized, no token" });
    }
};

module.exports = { protect };
