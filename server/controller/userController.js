const util = require("util");
const db = require("../db");
const bcrypt = require("bcryptjs");
/*
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
*/



async function updateUser(req, res) {
    const userId = req.user.user_id;
    const { username, email } = req.body; // Removed the password from destructuring

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

        // Removed the code related to hashing the password as it's not needed for profile update
        const updateUserQuery = "UPDATE users SET username = ?, email = ? WHERE user_id = ?"; // Removed password update from the query
        await query(updateUserQuery, [lcUsername, lcEmail, userId]); // Adjusted the parameters to exclude password

        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        console.log(error);
        console.log("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function updatePassword(req, res) {
    const userId = req.user.user_id;
    const { currentPassword, newPassword } = req.body;
    console.log("Received currentPassword:", currentPassword);
    console.log("Received newPassword:", newPassword);
    const query = util.promisify(db.query).bind(db);

    try {
        const user = await query("SELECT * FROM users WHERE user_id = ?", [userId]);

        if (user.length < 1) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await query("UPDATE users SET password = ? WHERE user_id = ?", [hashedPassword, userId]);

        return res.status(200).json({ message: "Password updated successfully" });

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
    updatePassword,
}