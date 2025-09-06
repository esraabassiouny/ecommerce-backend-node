const User = require("../models/userModel");
const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");

// Get user profile
router.get("/profile", isAuth, getUserProfile);

// Update user profile
router.patch("/profile", isAuth, updateUserProfile);


module.exports = router;