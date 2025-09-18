// cartController.js
const Cart = require('../models/Cart')
const { Product } = require("../models/Product.js");
const { findStock } = require("../utils/inventory");


// Get current user's cart
exports.getCart = async (req, res) => {
  // TODO: Fetch cart items for logged-in user
  try{
    const userId = req.user.userId;
    // const userId = req.params.id;
    let cart = await Cart.findOne({ userId }).populate("items.product");;
    if(!cart || cart.items.length === 0) res.status(404).json({ message: 'Cart not found' });
    return res.status(200).json({cart});
  } catch(err){
    res.status(500).json({ error: err.message });
  }
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
    // check stock
    const productStock = await findStock(productId);
    if(productStock < quantity) return res.status(400).json({ message: `Not enough stock. Only ${productStock} available.`});
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
  try{
    const {userId, productId, quantity } = req.body;
    // const userId = req.user.userId;
    let cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) return res.status(404).json({ message: 'Cart not found' });
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Product not in cart' });
    const productStock = await findStock(productId);
    if(productStock < quantity) return res.status(400).json({ message: `Not enough stock. Only ${productStock} available.`});
    if (quantity <= 0) 
    {
      cart.items.splice(itemIndex, 1)
    } 
    else
    {
      cart.items[itemIndex].quantity = quantity;
      const product = await Product.findById(productId);
      cart.items[itemIndex].price = quantity * product.price;
    }
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0)
    await cart.save();
    return res.status(200).json({ cart });
  }
  catch(err)
  {
    return res.status(500).json({ error: err.message });
  }

};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  // TODO: Remove product from cart
  try{
    // const userId = req.user.userId;
    const {userId} = req.body;
    console.log(userId)
    const {productId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) return res.status(404).json({ message: 'Cart not found' });
    let item = cart.items.find(item => item.product.toString() === productId);
    if(!item) return res.status(404).json({ message: 'Item not found' });
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);
    await cart.save();
    return res.json({cart});
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  // TODO: Empty all cart items
  try{
    const userId = req.user.userId;
    let cart = await Cart.findOne({ userId });
    if(!cart || cart.items.length === 0) return res.status(404).json({ message: 'Cart not found' });
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    return res.json({cart, message: 'Cart cleared'});
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

