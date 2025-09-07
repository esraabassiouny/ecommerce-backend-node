const express = require("express");
const router = express.Router();
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");
const upload = require('../utils/multerConfig');

router.post('/', upload.array('images', 5), addProduct); //limit max 5 images for the product 
// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin (you can add auth middleware later)
router.post("/", addProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
