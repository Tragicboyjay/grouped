const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    createGroup
} = require('../controller/groupController')

router.post('/create/:topicId', protect, createGroup)

module.exports = router;