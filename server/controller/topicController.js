const db = require("../db")

function allTopics(req,res) {
    db.query("SELECT * FROM topics", (err,data) => {
        if (err) return res.json({message: "error fetching data", error: err})
        return res.status(400).json({message: "Topics Fetch Successful", topics: data})
    })
}

module.exports = {
    allTopics
}