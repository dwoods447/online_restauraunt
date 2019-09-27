const express = require('express');
const router = express.Router();
const AddOnController = require('../controllers/AddOnController');

router.get('/addon/:category_id', AddOnController.getAddOns);
module.exports = router;