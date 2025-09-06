const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authMiddleware, roleMiddleware } = require("../middlewares/auth");

// All admin routes → must be authenticated + role: admin
router.use(authMiddleware, roleMiddleware(["admin"]));

router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.patch("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);

router.patch("/users/:id/role", adminController.updateUserRole);

router.get("/stats", adminController.getStats);

module.exports = router;
