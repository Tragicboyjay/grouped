const util = require("util");
const db = require("../db");
// Create a new group
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
            group_id: groupResult[0].group_id,
            name: groupResult[0].name,
            topic_id: groupResult[0].topic_id,
            admin_id: groupResult[0].admin_id,
            created_at: groupResult[0].created_at
        } 

        return res.status(201).json({ message: "Group created successfully!", group: newGroup })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
// Delete an existing group
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
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}




// Fetch all groups
async function getGroups(req,res) {

    //const userId = req.user.user_id;
    //const { groupId } = req.body;

    const query = util.promisify(db.query).bind(db);

    try {
        const allGroups = await query("SELECT * FROM `groups`");

        return res.status(200).json({ message: "Groups fetched successfully", groups: allGroups});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// James --- New Functionality Added Below ---

// Allow users to join an existing group
async function joinGroup(req, res) {
    const userId = req.user.user_id; // The ID of the user joining the group
    const { groupId } = req.body; // The ID of the group to join

    const query = util.promisify(db.query).bind(db);

    try {
        const existingGroup = await query("SELECT 1 FROM `groups` WHERE group_id = ?", [groupId]);

        if (existingGroup.length < 1) {
            return res.status(404).json({ message: "Group does not exist." });
        }

        // Check if the user is already a member of the group
        const existingMembership = await query("SELECT 1 FROM user_groups WHERE user_id = ? AND group_id = ?", [userId, groupId]);

        if (existingMembership.length > 0) {
            return res.status(409).json({ message: "User is already a member of this group." });
        }

        // Add the user to the group
        await query("INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)", [userId, groupId]);

        return res.status(200).json({ message: "Joined group successfully." });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// --- End of New Functionality ---


module.exports = {
    createGroup,
    deleteGroup,
    getGroups,
    joinGroup //James Export the new joinGroup function
}