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

        const createUserQuery = "INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)";
        const result = await query(createUserQuery, [lcUsername, lcEmail, hashedPassword, new Date(Date.now())]);

        const getUserQuery = "SELECT user_id, username, email, created_at FROM users WHERE user_id = ?";
        const userResult = await query(getUserQuery, [result.insertId]);

        const newUser = {
            id: userResult[0].user_id,
            username: userResult[0].username,
            email: userResult[0].email,
            created_at: userResult[0].created_at,
            token: generateToken(userResult[0].user_id)
        };

        return res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
// Authenticate an existing user
async function authenticateUser(req,res) {
    const { username, password } = req.body;
    const lcUsername = username.toLowerCase();

    const query = util.promisify(db.query).bind(db);

    try {
        const search = await query("SELECT user_id, username, email, password, created_at FROM users WHERE username = ?", [lcUsername]);

        if (search.length < 1) {
            return res.status(404).json({ message: "Username or password incorrect." });
        }

        const existingUser = search[0];

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(404).json({ message: "Username or password incorrect."});
        }

        const user = {
            id: existingUser.user_id,
            username: existingUser.username,
            email: existingUser.email,
            created_at: existingUser.created_at,
            token: generateToken(existingUser.user_id)
        }

        return res.status(200).json({ message: "User successfully loged in.", user: user})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }  
}

function generateToken(id) {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: '30d'
    });
};

//James --- New Functionality Added Below ---

//Justice --- Moved to user controller ---

// Update user details (username, email, and/or password)
// async function updateUser(req, res) {
//     const userId = req.user.id; // Assuming the user ID is stored in req.user after authentication middleware
//     const { username, email, password } = req.body;

//     const lcUsername = username.toLowerCase();
//     const lcEmail = email.toLowerCase();

//     const query = util.promisify(db.query).bind(db);

//     try {
//         const existingEmail = await query("SELECT 1 FROM users WHERE email = ? AND user_id != ?", [lcEmail, userId]);
//         const existingUsername = await query("SELECT 1 FROM users WHERE username = ? AND user_id != ?", [lcUsername, userId]);

//         if (existingEmail.length > 0) {
//             return res.status(409).json({ message: "Email already taken." });
//         }

//         if (existingUsername.length > 0) {
//             return res.status(409).json({ message: "Username already taken." });
//         }

//         let hashedPassword = null;
//         if (password) {
//             hashedPassword = await bcrypt.hash(password, 10);
//         }

//         const updateUserQuery = "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?";
//         await query(updateUserQuery, [lcUsername, lcEmail, hashedPassword || req.user.password, userId]);

//         return res.status(200).json({ message: "User updated successfully" });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// --- End of New Functionality ---



module.exports = {
    createUser,
    authenticateUser,
}