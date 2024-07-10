const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    createGroup,
    deleteGroup,
    getGroups
} = require('../controller/groupController');


router.post('/create/:topicId', protect, createGroup);
router.delete('/:groupId', protect, deleteGroup);

router.get("/all", getGroups)

module.exports = router;