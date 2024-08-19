const express = require("express");
const router = express.Router(); 

const { protect } = require("../middleware/authMiddleware");

const {
    updateUser,
    deleteUser,
    updatePassword
} = require("../controller/userController")

router.post("/update", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);
// New route for updating password
router.post("/updatePassword", protect, updatePassword);
module.exports = router; 
