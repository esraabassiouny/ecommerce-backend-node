const jwt = require("jsonwebtoken");
const { blacklist } = require("../controllers/authenticationController"); 
const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  if (blacklist.has(token)) {
    return res.status(401).json({ message: "Token has been revoked, please log in again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = isAuth;
