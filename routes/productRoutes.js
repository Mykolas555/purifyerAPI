const express = require('express');
const productController = require('../controllers/productController');
const validateID = require('../utils/validators');

const router = express.Router();

// Route for getting all products
router.get('/', productController.getAllProducts);
router.get('/newest', productController.getNewestProducts);
router.get('/:ID', validateID, productController.getProductById);


module.exports = router;
