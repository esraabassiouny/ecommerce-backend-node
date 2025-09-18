const express = require('express')
const orderController = require('../controllers/orderController');
const isAuth = require('../middlewares/isAuth');
const router = express.Router();

// router.use(isAuth);

router.get('/:id', orderController.getOrders);

// router.get('/:id', orderController.getOrderById);

router.post('/create-order', orderController.createOrder);

router.put('/cancel-order/:id', orderController.cancelOrder);

module.exports = router;