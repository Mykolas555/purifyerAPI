const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../utils/multer');
const validateID = require('../utils/validators');
const validatorToken = require('../utils/validatorToken');
const adminRestrict = require('../utils/adminRestrict');

const router = express.Router();

router.post('/addProduct', upload.fields([
  { name: 'swiperImage1', maxCount: 1 },
  { name: 'swiperImage2', maxCount: 1 },
  { name: 'swiperImage3', maxCount: 1 },
  { name: 'swiperImage4', maxCount: 1 },
  { name: 'swiperImage5', maxCount: 1 },
  { name: 'swiperImage6', maxCount: 1 },
  { name: 'contentImage1', maxCount: 1 },
  { name: 'contentImage2', maxCount: 1 }
]), validatorToken, productController.addProduct);
router.get('/', productController.getAllProducts);
router.get('/newest', productController.getNewestProducts);
router.get('/productTable', validatorToken, productController.getAllProductsToFrontTable);
router.get('/:ID', validateID, productController.getProductById);
router.patch('/:ID', validateID, validatorToken, productController.showProductInPage);
router.delete('/:ID', validateID, validatorToken, adminRestrict, productController.deleteProduct);

module.exports = router;