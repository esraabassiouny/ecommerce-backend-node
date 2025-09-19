const { Product } = require("../models/Product.js");
const { Category } = require("../models/Category.js");
const mongoose = require("mongoose");
const { deleteFilesIfLocal } = require("../utils/fileHelper"); 
// GET all products
async function getProducts(req, res) {
  try {
   const products = await Product.find()
      .populate('categoryId', 'name');
    res.status(200).json({ data: products });
  } catch (err) {
    console.error("❌ Error in getProducts:", err);
  res.status(500).json({ message: err.message });
  }
}

// GET product by ID
async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ data: product });
  } catch (err) {
    res.status(500).json({ message: "Error getting product" });
  }
}

async function addProduct(req, res) {
  try {
    const { _id, ...data } = req.body; 
    const files = req.files || [];
    const images = files.map(f => '/uploads/' + f.filename);

    
    let categoryId = data.categoryId;
    if (!categoryId || categoryId.trim() === "") {
      categoryId = undefined;
    }

    const product = await Product.create({
      ...data,
      images,
      categoryId, 
      isFeatured: data.isFeatured === 'true' || data.isFeatured === true
    });

    res.status(201).json({ message: "Product added", data: product });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(400).json({ error: err.message });
  }
}
// PUT update product
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updated = await Product.findByIdAndUpdate(id, newData, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
}

// DELETE product
async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
     // ✅ Remove images from local storage
    deleteFilesIfLocal(deleted.images);
    res.status(200).json({ message: "Product deleted", data: deleted });
  } catch (err) {
    console.error("❌ Error deleting product:", err.message);
    res.status(500).json({ message: "Error deleting product" });
  }
}

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
