const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    createGroup,
    deleteGroup
} = require('../controller/groupController')

router.post('/create/:topicId', protect, createGroup);
router.delete('/:groupId', protect, deleteGroup);

module.exports = router;