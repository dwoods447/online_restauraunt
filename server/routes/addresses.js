  
const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.post('/lookup/:address', AddressController.lookupAddress);

module.exports = router;