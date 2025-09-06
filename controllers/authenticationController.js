const { User } = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register new user
exports.register = async (req, res) => {
  const NewUser = req.body;

  if (!NewUser.name || !NewUser.email || !NewUser.password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  try {
    User.create(NewUser, (err, user) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(400).json({ message: "Error creating user" });
      }
      console.log("User created:", user);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Registration error" });
  }

  generateToken(user);

};

// Login user
exports.login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findone({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user);

    res.status(200).json({ message: "login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "login error" });
  }

};



// --------------------------------------------------------------------------------------------------------------

function generateToken(user)
{
    jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error generating token" });
      }
      res.status(201).json({ message: "User created successfully", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
  );
}
