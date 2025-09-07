const { Category } = require("../models/Category.js");

// GET all categories
async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: "Error getting categories" });
  }
}

// GET category by ID
async function getCategoryById(req, res) {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ data: category });
  } catch (err) {
    res.status(500).json({ message: "Error getting category" });
  }
}

// POST create category
async function addCategory(req, res) {
  try {
    const newCategory = req.body;
    const category = await Category.create(newCategory);
    res.status(201).json({ message: "Category added", data: category });
  } catch (err) {
    res.status(500).json({ message: "Error adding category" });
  }
}

// PUT update category
async function updateCategory(req, res) {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updated = await Category.findByIdAndUpdate(id, newData, { new: true });
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating category" });
  }
}

// DELETE category
async function deleteCategory(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category" });
  }
}

module.exports = { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory };
