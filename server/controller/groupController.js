const db = require("../db");

async function createGroup(req,res) {
    const {
        name,
        topicId,
        adminId,
    } = req.body;

    const query = util.promisify(db.query).bind(db);

    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deleteGroup(req,res) {

}

module.exports = {
    createGroup,
    deleteGroup
}