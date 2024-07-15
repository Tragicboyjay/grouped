const db = require("../db")
const util = require("util");

async function allTopics(req,res) {

    const query = util.promisify(db.query).bind(db);

    try {
        const topics = await query("SELECT * FROM topics");

        return res.status(200).json({message: "Topics Fetch Successful", topics: topics})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    allTopics
}