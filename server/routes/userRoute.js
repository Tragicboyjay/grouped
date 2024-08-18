const express = require("express");
const router = express.Router(); 

const { protect } = require("../middleware/authMiddleware");

const {
    updateUser,
    deleteUser
} = require("../controller/userController")

router.post("/update", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);

module.exports = router; 
