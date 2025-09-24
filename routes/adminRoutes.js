const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");
const productController = require("../controllers/productController.js");

router.use(isAuth, isAdmin);

router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.patch("/users/:id", adminController.updateUser);
router.delete("/users/:id", adminController.deleteUser);


router.get("/orders", adminController.getAllOrders);
router.put("/orders/:id", adminController.updateOrderStatus);


// router.patch("/users/:id/role", adminController.updateUserRole);

// router.get("/stats", adminController.getStats);

module.exports = router;
