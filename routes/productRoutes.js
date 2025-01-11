const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../utils/multer');
const validateID = require('../utils/validators');
const validatorToken = require('../utils/validatorToken');
const adminRestrict = require('../utils/adminRestrict');

const router = express.Router();

// Backend route: Ensure this matches the field names in the front-end form
router.post('/addProduct',  upload.fields([
  { name: 'swipperImage1', maxCount: 1 },
  { name: 'swipperImage2', maxCount: 1 },
  { name: 'swipperImage3', maxCount: 1 },
  { name: 'swipperImage4', maxCount: 1 },
  { name: 'swipperImage5', maxCount: 1 },
  { name: 'contentImage1', maxCount: 1 }, // New content image 1
  { name: 'contentImage2', maxCount: 1 }  // New content image 2
]), productController.addProduct);


router.get('/', productController.getAllProducts);
router.get('/newest', productController.getNewestProducts);
router.patch('/:ID', validateID, validatorToken, productController.updateProduct);
router.get('/:ID', validateID, productController.getProductById);
router.delete('/:ID', validateID, validatorToken, adminRestrict, productController.deleteProduct);

module.exports = router;
