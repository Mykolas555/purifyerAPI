const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    cb(null, uploadDir);  // Set upload directory
  },
  filename: function (req, file, cb) {
    // Create a unique filename using Date.now and the file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Export the configured multer instance with file field restrictions
const upload = multer({ storage });

module.exports = upload;