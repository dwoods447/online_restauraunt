const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');


router.post('/order/create', OrderController.createOrder);
router.get('/order/find/:order_id', OrderController.getOrder);
router.get('/find/all', OrderController.getAllOrders);

module.exports = router;