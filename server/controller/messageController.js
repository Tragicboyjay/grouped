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

async function getMessagesByUser(req,res) {
    const { userId } = req.params;

    if (!userId) return res.status(400).json({ message: "No user id provided"});
    
    const query = util.promisify(db.query).bind(db);

    try{
        const existingUser = await query("SELECT 1 FROM users WHERE user_id = ?", [userId]);

        if (existingUser.length < 1) return res.status(409).json({ message: "Invalid user id submited"});

        const messages = await query("SELECT * FROM messages where authour_id = ?", [userId]);

        return res.status(200).json({ message: "Messages fetched successfully", messages});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getMessagesByGroup(req, res) {
    const { groupId } = req.params;

    if (!groupId) {
        return res.status(400).json({ message: "No group id provided" });
    }

    const query = util.promisify(db.query).bind(db);

    try {
        // Check if the group exists
        const existingGroup = await query("SELECT 1 FROM `groups` WHERE group_id = ?", [groupId]);

        if (existingGroup.length < 1) {
            return res.status(409).json({ message: "Invalid group id submitted" });
        }

        // Fetch messages along with user information
        const messages = await query(`
              SELECT 
                m.message_id AS messageId,
                m.body AS messageBody,
                m.authour_id AS userId,  
                m.group_id AS groupId,
                m.sent_at AS sentAt,
                u.username 
            FROM messages m
            JOIN users u ON m.authour_id = u.user_id  
            WHERE m.group_id = ? 
            ORDER BY m.sent_at ASC
        `, [groupId]);

        return res.status(200).json({
            message: "Messages fetched successfully",
            messages
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getMessagesByTopic(req,res) {
    const { topicId } = req.params;

    if (!topicId) return res.status(400).json({ message: "No topic id provided"});
    
    const query = util.promisify(db.query).bind(db);

    try{
        const existingTopic = await query("SELECT 1 FROM `topics` WHERE topic_id = ?", [topicId]);

        if (existingTopic.length < 1) return res.status(409).json({ message: "Invalid topic id submited"});
        
        const messages = await query(`
            SELECT m.*
            FROM messages m
            JOIN \`groups\` g ON m.group_id = g.group_id
            WHERE g.topic_id = ?;
        `, [topicId]);
        

        return res.status(200).json({ message: "Messages fetched successfully", messages});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    sendMessage,
    getMessagesByUser,
    getMessagesByGroup,
    getMessagesByTopic
}