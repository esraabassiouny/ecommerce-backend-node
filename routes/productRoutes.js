const express = require("express");
const router = express.Router();
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");
const upload = require('../utils/multerConfig');
const isAdmin = require("../middlewares/isAdmin");

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only
router.post("/", isAdmin, upload.array('images', 5), addProduct);
router.patch("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;
