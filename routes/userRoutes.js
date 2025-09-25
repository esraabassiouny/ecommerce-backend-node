const express = require("express");
const router = express.Router();
const isAuth  = require("../middlewares/isAuth");
const userController = require("../controllers/userController");

router.use(isAuth);

router.get("/profile", userController.getProfile);
router.patch("/profile", userController.updateProfile);
router.delete("/profile", userController.deleteProfile);
router.patch("/profile/password", userController.changePassword);


module.exports = router;
