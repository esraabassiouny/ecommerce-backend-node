const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const userController = require("../controllers/userController");

// All routes below require authentication
router.use(isAuth);

router.get("/profile", userController.getProfile);
router.patch("/profile", userController.updateProfile);
router.delete("/profile", userController.deleteProfile);
router.patch("/profile/password", userController.changePassword);


module.exports = router;
