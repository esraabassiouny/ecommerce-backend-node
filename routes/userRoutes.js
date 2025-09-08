const User = require("../models/userModel");
const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");

router.use(isAuth);

// Get user profile
router.get("/profile", getUserProfile);

// Update user profile
router.patch("/profile", updateUserProfile);


module.exports = router;