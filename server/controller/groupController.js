const util = require("util");
const db = require("../db");

async function createGroup(req,res) {
    const { topicId } = req.params;
    const { groupName } = req.body;

    const userId = req.user.user_id;

    const currentDate = new Date();

    const query = util.promisify(db.query).bind(db);

    try {
        const existingTopic = await query("SELECT 1 FROM topics WHERE topic_id = ?", [topicId]);

        if (existingTopic.length < 1) {
            return res.status(409).json({ message: "Topic does not exist." })
        }

        const existingGroup = await query("SELECT 1 FROM `groups` WHERE name = ?", [groupName]);

        if (existingGroup.length > 0) {
            return res.status(409).json({ message: "Group name already taken." })
        }

        const sql = "INSERT INTO `groups` (name, topic_id, admin_id, created_at) VALUES (?,?,?,?)";
        const result = await query(sql, [groupName, topicId, userId, currentDate]);

        const groupResult = await query("SELECT group_id, name, topic_id, admin_id, created_at FROM `groups` WHERE group_id = ?", [result.insertId]);

        const newGroup = {
            id: groupResult[0].group_id,
            name: groupResult[0].name,
            topicId: groupResult[0].topic_id,
            adminId: groupResult[0].admin_id,
            created_at: groupResult[0].created_at
        } 

        return res.status(201).json({ message: "Group created successfully!", group: newGroup })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteGroup(req,res) {
    const userId = req.user.user_id;
    const { groupId } = req.params;

    const query = util.promisify(db.query).bind(db);

    try {
        const existingGroup = await query("SELECT admin_id, group_id FROM `groups` WHERE group_id = ?", [groupId]);

        if (existingGroup.length < 1) return res.status(409).json({ message: "Group does not exist." });
        
    
        const groupAdminId = existingGroup[0].admin_id;
    
        if (groupAdminId != userId) return res.status(401).json({ message: "Not authorized." });
    
        await query("DELETE FROM `groups` WHERE group_id = ?", [existingGroup[0].group_id]);
    
        return res.status(200).json({ message: "Group deleted successfully."});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    createGroup,
    deleteGroup
}