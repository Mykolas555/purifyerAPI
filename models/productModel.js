const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
 properties: {
    type: String,
    
  },
  summary: {
    type: String,
   
  },
  specs: {
    type: String,
    
  },
  image: {
    type: String,
    
  },
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
