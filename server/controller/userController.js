const util = require("util");
const db = require("../db");

async function updateUser(req, res) {
    const userId = req.user.user_id; // Assuming the user ID is stored in req.user after authentication middleware
    const { username, email, password } = req.body;

    const lcUsername = username.toLowerCase();
    const lcEmail = email.toLowerCase();

    const query = util.promisify(db.query).bind(db);

    try {
        const existingEmail = await query("SELECT 1 FROM users WHERE email = ? AND user_id != ?", [lcEmail, userId]);
        const existingUsername = await query("SELECT 1 FROM users WHERE username = ? AND user_id != ?", [lcUsername, userId]);

        if (existingEmail.length > 0) {
            return res.status(409).json({ message: "Email already taken." });
        }

        if (existingUsername.length > 0) {
            return res.status(409).json({ message: "Username already taken." });
        }

        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updateUserQuery = "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?";
        await query(updateUserQuery, [lcUsername, lcEmail, hashedPassword || req.user.password, userId]);

        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteUser(req,res) {
    const userId = req.user.user_id;
    const id = req.params.id;

    if (userId != id) {
        return res.status(403).json({ message: "Unauthorized." });
    }

    const query = util.promisify(db.query).bind(db);

    try {
        const existingUser = await query("SELECT 1 FROM users WHERE user_id = ?", [userId])

        if (existingUser.length < 1) {
            return res.status(404).json({ message: "User not found." });
        }

        await query("DELETE FROM users WHERE user_id = ?", [userId])

        return res.status(200).json({ message: "Account deleted sucessfully." });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    updateUser,
    deleteUser,
}