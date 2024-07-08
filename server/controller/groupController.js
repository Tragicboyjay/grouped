const db = require("../db");

async function createGroup(req,res) {
    const {} = req.body;
    
    const query = util.promisify(db.query).bind(db);
}

async function deleteGroup(req,res) {

}

module.exports = {
    createGroup,
    deleteGroup
}