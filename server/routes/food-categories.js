  
const express = require('express');
const router = express.Router();

const FoodCategoriesController = require('../controllers/FoodCategoriesController');
router.get('/food-categories/all', FoodCategoriesController.getFoodCategories);
module.exports = router;