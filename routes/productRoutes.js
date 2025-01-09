const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../multer');
const validateID = require('../utils/validators');
const validatorToken = require('../utils/validatorToken')
const adminRestrict = require('../utils/adminRestrict')

const router = express.Router();

// Route for getting all products
router.get('/', productController.getAllProducts);
router.get('/newest', productController.getNewestProducts);
router.patch('/:ID', validateID, validatorToken, productController.updateProduct);
router.get('/:ID', validateID, productController.getProductById);
router.delete('/:ID', validateID, validatorToken, adminRestrict, productController.deleteProduct);

module.exports = router;
