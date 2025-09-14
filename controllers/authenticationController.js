const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  try {
    const user = await User.create({ name, email, password });

    const token = generateToken(user);

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(err);
    return res.status(400).json({ message: "Error creating user" });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Login error" });
  }
};


const blacklist = new Set(); 
exports.blacklist = blacklist;

exports.logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    blacklist.add(token); 
  }
  res.json({ message: "Logged out successfully", data: blacklist });
};


// ----------------------------------------------------
function generateToken(user) {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1D" }
  );
}
