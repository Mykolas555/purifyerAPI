const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // Ensure the uploads directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);  // Save files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Generate a random 6-digit number
    const random6Digits = Math.floor(100000 + Math.random() * 900000); // Random number between 100000 and 999999
    // Generate a unique filename using the current timestamp, random 6-digit number, and the original file's extension
    const uniqueSuffix = Date.now() + '-' + random6Digits; // Combine timestamp and random 6-digit number
    const ext = path.extname(file.originalname); // Get the file extension
    const filename = uniqueSuffix + ext; // Combine the unique suffix and extension
    cb(null, filename);  // Save the file with the unique name
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
