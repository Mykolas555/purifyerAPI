const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
 properties: {
    type: String,
    required: [true, 'Product price is required'],
    min: 0,
  },
  summary: {
    type: String,
    required: [true, 'Product price is required'],
    min: 0,
  },
  specs: {
    type: String,
    required: [true, 'Product price is required'],
    min: 0,
  },
  image: {
    type: String,
    min: 0,
  },
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
