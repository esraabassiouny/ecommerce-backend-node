const { Product } = require("../models/Product");

async function findStock(productId) {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  return product.stock;
}

module.exports = { findStock };
