const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  swipperImage1: {
    type: String,
  },
  swipperImage2: {
    type: String,
  },
  swipperImage3: {
    type: String,
  },
  swipperImage4: {
    type: String,
  },
  swipperImage5: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  properties: {
    type: String,
  },
  contentImage1: {
    type: String,
  },
  contentImage2: {
    type: String,
  },
  specs: {
    type: String,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
