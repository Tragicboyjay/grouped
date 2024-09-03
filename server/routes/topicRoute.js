const express = require("express");
const router = express.Router(); 

const {
    allTopics
} = require("../controller/topicController")

router.get("/all", allTopics);

module.exports = router; 
