const util = require('util');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(req,res) {
    const { username, email, password } = req.body;

    const lcUsername = username.toLowerCase();
    const lcEmail = email.toLowerCase();

    const query = util.promisify(db.query).bind(db);

    try {
        const existingEmail = await query("SELECT 1 FROM users WHERE email = ?", [lcEmail]);
        const existingUsername = await query("SELECT 1 FROM users WHERE username = ?", [lcUsername]);

        if (existingEmail.length > 0) {
            return res.status(409).json({ message: "Email already taken." });
        }

        if (existingUsername.length > 0) {
            return res.status(409).json({message: "Email already taken."})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUserQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const result = await query(createUserQuery, [lcUsername, lcEmail, hashedPassword]);

        const getUserQuery = "SELECT user_id, username, email FROM users WHERE user_id = ?";
        const userResult = await query(getUserQuery, [result.insertId]);

        const newUser = {
            id: userResult[0].user_id,
            username: userResult[0].username,
            email: userResult[0].email,
        };

        return res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

function authenticateUser(req,res) {

}

module.exports = {
    createUser,
    authenticateUser
}