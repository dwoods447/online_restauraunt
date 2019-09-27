  
const express = require('express');
const router = express.Router();

const MenuItemController = require('../controllers/MenuItemController');
router.get('/menu-item/food/:id', MenuItemController.getFoodsInCategory);
module.exports = router;