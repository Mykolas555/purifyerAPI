const Product = require('../models/productModel');
const upload = require('../multer');  // Import the multer configuration

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

  exports.createProduct = [
    upload.single('image'),  // Use multer to handle image upload
    async (req, res) => {
      try {
        const { name, summary, properties, specs } = req.body;
  
        // If image file exists, get the file path
        const image = req.file ? req.file.path : null;
  
        // Create new product
        const product = new Product({
          name,
          summary,
          properties,
          specs,
          image,
        });
  
        // Save product to the database
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  ];
  
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
  

 
