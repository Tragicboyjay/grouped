const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    sendMessage,
    getMessagesByUser,
    getMessagesByGroup,
    getMessagesByTopic
} = require("../controller/messageController");

router.post("/send/:groupId", protect, sendMessage);

router.get("/all/user/:userId", getMessagesByUser);
router.get("/all/group/:groupId", getMessagesByGroup);
router.get("/all/topic/:topicId", getMessagesByTopic);

module.exports = router;