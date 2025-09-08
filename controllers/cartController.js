// cartController.js
const Cart = require('../models/Cart')
const { Product } = require("../models/Product.js");

// Get current user's cart
exports.getCart = async (req, res) => {
  // TODO: Fetch cart items for logged-in user
};

// Add item to cart
exports.addToCart = async (req, res) => {
  // TODO:
  // 1. Find user's cart or create new one
  // 2. Add product with quantity
  // 3. Update total price
  try{
  const { productId, quantity } = req.body;
  const userId = req.user.userId;
  let cart = await Cart.findOne({ userId });
  if(!cart)
  {
    cart = await Cart.create({
      userId,
      items: [],
      totalPrice: 0
    });
  }
  // find product price
  const product = await Product.findById(productId);
  if(!product)  return res.status(404).json({ message: 'Product not found' });
  const price = product.price * quantity;
  // check if product already in cart >> just edit quantity & price
  const itemIndex = cart.items.findIndex((item)=>item.product == productId);
  if(itemIndex > -1)
  {
    cart.items[itemIndex].quantity += quantity;
    cart.items[itemIndex].price = product.price * cart.items[itemIndex].quantity;  
  }
  else
    cart.items.push({ product: productId, quantity, price });
  // update total price
  cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);
  await cart.save();
  res.json(cart)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

// Update item quantity
exports.updateCartItem = async (req, res) => {
  // TODO: Change quantity for a specific product in cart
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  // TODO: Remove product from cart
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  // TODO: Empty all cart items
};
