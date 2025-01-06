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

  exports.createProduct = async (req, res) => {
    try {
      // Handle image upload
      upload.single('image')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Error uploading image', error: err.message });
        }
  
        // After the file is uploaded, get the image path
        const imagePath = req.file ? req.file.path : null;
  
        const { name, properties, summary, specs } = req.body;
  
        // Check if required fields are provided
        if (!name || !properties || !summary || !specs) {
          return res.status(400).json({ message: 'All fields are required' });
        }
  
        // Create a new product with the image path
        const product = new Product({
          name,
          properties,
          summary,
          specs,
          image: imagePath, // Save the image path to MongoDB
        });
  
        // Save the product to the database
        const savedProduct = await product.save();
  
        // Return the saved product object in the response
        res.status(201).json(savedProduct);
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  

 
