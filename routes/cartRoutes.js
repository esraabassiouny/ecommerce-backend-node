const express = require('express')
const cartController = require('../controllers/cartController')
const router = express.Router();
const isAuth = require('../middlewares/isAuth')

router.use(isAuth);

router.get('/', cartController.getCart);

router.post('/add', cartController.addToCart);

router.delete('/remove/:productId', cartController.removeCartItem);

router.delete('/clear', cartController.clearCart);

router.put('/update', cartController.updateCartItem);


module.exports = router;