const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authController = require("../controllers/authenticationController");
const bcrypt = require("bcrypt");



router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post("/logout", exports.logout);
// router.post("/reset-password/:token", exports.resetPassword);


router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const admin = await User.create({
      name,
      email,
      password: password,
      role: "admin",
    });

    return res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    console.error("Admin creation error:", err);
    return res.status(500).json({ message: "Error creating admin", error: err.message });
  }
});

module.exports = router;