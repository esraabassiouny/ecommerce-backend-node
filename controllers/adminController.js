const User = require("../models/User");
const Order = require("../models/Order");


exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("name email role address createdAt updatedAt");
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("name email role address createdAt updatedAt");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("name email role address createdAt updatedAt");
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

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