const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    sendMessage
} = require("../controller/messageController")

router.post("/send/:groupId", protect, sendMessage);

module.exports = router;