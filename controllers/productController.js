const Product = require('../models/productModel');
const fs = require('fs');
const path = require('path');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }) ;
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

  exports.addProduct = async (req, res) => {
    try {
      // Extracting file paths for swiper images
      const swipperImage1 = req.files['swipperImage1'] ? `/uploads/${req.files['swipperImage1'][0].filename}` : null;
      const swipperImage2 = req.files['swipperImage2'] ? `/uploads/${req.files['swipperImage2'][0].filename}` : null;
      const swipperImage3 = req.files['swipperImage3'] ? `/uploads/${req.files['swipperImage3'][0].filename}` : null;
      const swipperImage4 = req.files['swipperImage4'] ? `/uploads/${req.files['swipperImage4'][0].filename}` : null;
      const swipperImage5 = req.files['swipperImage5'] ? `/uploads/${req.files['swipperImage5'][0].filename}` : null;

      // Extracting file paths for content images
      const contentImage1 = req.files['contentImage1'] ? `/uploads/${req.files['contentImage1'][0].filename}` : null;
      const contentImage2 = req.files['contentImage2'] ? `/uploads/${req.files['contentImage2'][0].filename}` : null;

      // Create a new product document with all necessary data
      const product = new Product({
        name: req.body.name,
        summary: req.body.summary,
        properties: req.body.properties,
        specs: req.body.specs,
        swipperImage1,
        swipperImage2,
        swipperImage3,
        swipperImage4,
        swipperImage5,
        contentImage1,
        contentImage2
      });
  
      // Save the product to the database
      await product.save();
      res.status(201).json({ message: 'Product created successfully!', product });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create product', error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
      const { ID } = req.params;
  
      // Find the product by ID
      const product = await Product.findById(ID);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Update product fields
      const updatedProduct = await Product.findByIdAndUpdate(
        ID,
        { $set: req.body },
        { new: true, runValidators: true }
      );
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

  
 exports.deleteProduct = async (req, res) => {
    try {
      const { ID } = req.params;
  
      // Find and delete the product by ID
      const product = await Product.findByIdAndDelete(ID);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

 
