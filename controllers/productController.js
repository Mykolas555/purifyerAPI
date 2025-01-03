const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.ID);
  
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          product,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  };

//get 3 newest products for home page
  exports.getNewestProducts = async (req, res) => {
    try {
      const newestProducts = await Product.find()
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(3);               // Limit to 3 products
  
      res.status(200).json({
        status: 'success',
        results: newestProducts.length,
        data: {
          products: newestProducts,
        },
      });
    } catch (err) {
      console.log(err); // Log the error for debugging
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  };