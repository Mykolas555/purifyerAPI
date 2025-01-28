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
      const newestProducts = await Product.find().sort({ createdAt: -1 }) .limit(3);
      res.status(200).json({
        status: 'success',
        results: newestProducts.length,
        data: {
          products: newestProducts,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  };

  exports.addProduct = async (req, res) => {
    try {
        // Extracting file paths for images
        const swiperImage1 = req.files['swiperImage1'] ? `/uploads/${req.files['swiperImage1'][0].filename}` : null;
        const swiperImage2 = req.files['swiperImage2'] ? `/uploads/${req.files['swiperImage2'][0].filename}` : null;
        const swiperImage3 = req.files['swiperImage3'] ? `/uploads/${req.files['swiperImage3'][0].filename}` : null;
        const swiperImage4 = req.files['swiperImage4'] ? `/uploads/${req.files['swiperImage4'][0].filename}` : null;
        const swiperImage5 = req.files['swiperImage5'] ? `/uploads/${req.files['swiperImage5'][0].filename}` : null;
        const swiperImage6 = req.files['swiperImage6'] ? `/uploads/${req.files['swiperImage6'][0].filename}` : null;
        const contentImage1 = req.files['contentImage1'] ? `/uploads/${req.files['contentImage1'][0].filename}` : null;
        const contentImage2 = req.files['contentImage2'] ? `/uploads/${req.files['contentImage2'][0].filename}` : null;
        // Create a new product document with nested structure
        const product = new Product({
            swiperImages: {
                swiperImage1,
                swiperImage2,
                swiperImage3,
                swiperImage4,
                swiperImage5,
                swiperImage6
            },
            name: req.body.name,
            summary: req.body.summary,
            properties1: {
                propertiesArticle1: req.body.propertiesArticle1,
                propertiesSummary1: req.body.propertiesSummary1
            },
            properties2: {
                propertiesArticle2: req.body.propertiesArticle2,
                propertiesSummary2: req.body.propertiesSummary2
            },
            properties3: {
                propertiesArticle3: req.body.propertiesArticle3,
                propertiesSummary3: req.body.propertiesSummary3
            },
            properties4: {
                propertiesArticle4: req.body.propertiesArticle4,
                propertiesSummary4: req.body.propertiesSummary4
            },
            properties5: {
                propertiesArticle5: req.body.propertiesArticle5,
                propertiesSummary5: req.body.propertiesSummary5
            },
            properties6: {
                propertiesArticle6: req.body.propertiesArticle6,
                propertiesSummary6: req.body.propertiesSummary6
            },
            contentImages: {
                contentImage1,
                contentImage2
            },
            specifications: {
                weight: req.body.weight,
                dimensions: req.body.dimensions,
                power: req.body.power,
                operating_temperature: req.body.operating_temperature,
                relative_humidity: req.body.relative_humidity,
                negative_ions: req.body.negative_ions
            }
        });
        await product.save();
        res.status(201).json({ message: 'Product created successfully!', product });
    } catch (error) { res.status(500).json({ message: 'Failed to create product', error });}
};

 exports.deleteProduct = async (req, res) => {
    try {
      const { ID } = req.params;
      const product = await Product.findByIdAndDelete(ID);
      if (!product) { return res.status(404).json({ message: 'Product not found' });}
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) { res.status(500).json({ message: error.message });}
  };
  
