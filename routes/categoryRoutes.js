const express = require("express");
const router = express.Router();
const { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory } = require("../controllers/categoryController.js");

// Public
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin (you can add auth middleware later)
router.post("/", addCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
