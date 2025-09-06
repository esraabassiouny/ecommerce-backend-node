const User = require("../models/User");

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