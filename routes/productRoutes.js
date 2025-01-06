const express = require('express');
const productController = require('../controllers/productController');
const validateID = require('../utils/validators');
const upload = require('../multer');

const router = express.Router();

// Route for getting all products
router.get('/', productController.getAllProducts);
router.get('/newest', productController.getNewestProducts);
router.patch('/:ID', productController.updateProduct);
router.get('/:ID', validateID, productController.getProductById);
router.delete('/:ID', productController.deleteProduct);

module.exports = router;
