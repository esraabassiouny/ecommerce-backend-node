const express = require('express')
const cartController = require('../controllers/cartController')
const router = express.Router();
const isAuth = require('../middlewares/isAuth')

router.post('/add', isAuth, cartController.addToCart);

module.exports = router;