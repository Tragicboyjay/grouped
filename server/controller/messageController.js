const util = require("util");
const db = require("../db");

async function sendMessage(req,res) {
    const userId = req.user.user_id;

    const { messageBody } = req.body;
    const { groupId } = req.params;
    const currentDate = new Date();

    const query = util.promisify(db.query).bind(db);

    try {
        const result = await query("INSERT INTO messages (body, authour_id, group_id, sent_at) VALUES (?,?,?,?)", [messageBody, userId, groupId, currentDate]);

        const sentMessage = await query("SELECT body, authour_id, group_id, sent_at, message_id from messages WHERE message_id = ?", [result.insertId]);

        return res.status(200).json({ message: "Message sent successfully", sentMessage: sentMessage });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    sendMessage
}