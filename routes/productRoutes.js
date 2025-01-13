const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../utils/multer');
const validateID = require('../utils/validators');
const validatorToken = require('../utils/validatorToken');
const adminRestrict = require('../utils/adminRestrict');

const router = express.Router();

// Backend route: Ensure this matches the field names in the front-end form
router.post('/addProduct', upload.fields([
  // Swiper Images
  { name: 'swiperImage1', maxCount: 1 },
  { name: 'swiperImage2', maxCount: 1 },
  { name: 'swiperImage3', maxCount: 1 },
  { name: 'swiperImage4', maxCount: 1 },
  { name: 'swiperImage5', maxCount: 1 },
  { name: 'swiperImage6', maxCount: 1 }, // Added swiperImage6
  // Content Images
  { name: 'contentImage1', maxCount: 1 },
  { name: 'contentImage2', maxCount: 1 }
]), productController.addProduct);


router.get('/', productController.getAllProducts);
router.get('/newest', productController.getNewestProducts);
router.patch('/:ID', validateID, validatorToken, productController.updateProduct);
router.get('/:ID', validateID, productController.getProductById);
router.delete('/:ID', validateID, validatorToken, adminRestrict, productController.deleteProduct);

module.exports = router;
