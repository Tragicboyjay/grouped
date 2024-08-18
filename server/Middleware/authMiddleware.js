const util = require('util');
const db = require('../db');
const jwt = require('jsonwebtoken');

const protect = async function(req, res, next) {
    console.log("here")
    let token;

    const query = util.promisify(db.query).bind(db);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token received:', token);  // Debugging log
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log('Decoded token:', decoded);  // Debugging log
            const search = await query("SELECT user_id, username, email, created_at FROM users WHERE user_id = ?", [decoded.id]);

            if (search.length > 0) {
                console.log('User found:', search[0]);  // Debugging log
                req.user = search[0];
                console.log("here " + req.user)
                return next();

            } else {
                console.log('User not found');  // Debugging log
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
