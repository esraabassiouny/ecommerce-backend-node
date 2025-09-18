// orderController.js
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const User = require('../models/User')
const { Product } = require("../models/Product.js");

// Get my orders (Customer)
exports.getOrders = async (req, res) => {
  // TODO:
  // - If customer: return only their orders
  // - If admin: return all orders
  try{
    //const userId = req.user.userId;

    const userId = req.params.id;
    let orders = await Order.find({ user: userId })
    // .populate('items.product');

    if(!orders) return res.status(404).json({ message: 'Orders not found' });

    return res.status(200).json(orders);
  } catch(err){
        res.status(500).json({ error: err.message })
  }  

};

// Get order details (Customer)
exports.getOrderById = async (req, res) => {
  // TODO: Return single order by ID (must belong to customer)
  try{
    const orderId = req.params.id;
    const userId = req.user.userId;

    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!req.user.isAdmin && order.user._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// Update order status (Admin) not checked yet
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const validStatuses = ["Pending", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    const updatedOrder = await order.save();

    return res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Place new order (Customer)
exports.createOrder = async (req, res) => {
  try {
    const { paymentMethod, shippingPrice, status } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${product.name} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}, only ${product.stock} left`,
        });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    // Calculate total
    const itemsTotal = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const order = await Order.create({
      user: userId,
      items: cart.items,
      shippingAddress: user.address,
      paymentMethod,
      shippingPrice,
      totalPrice: itemsTotal + shippingPrice,
      status,
    });

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Cancel order (Customer or Admin)
exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.userId;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!req.user.isAdmin && order.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this order" });
    }

    if (["Shipped", "Delivered"].includes(order.status)) {
      return res.status(400).json({ message: "Cannot cancel shipped or delivered orders" });
    }

    // Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.status = "Cancelled";
    const cancelledOrder = await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order: cancelledOrder,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
