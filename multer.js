const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to generate random digits
function generateRandomDigits(length) {
  return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

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
    const randomDigits = generateRandomDigits(6); // Generate 6 random digits
    const timestamp = Date.now(); // Get the current timestamp
    const extension = path.extname(file.originalname); // Get the file extension
    const filename = `${timestamp}-${randomDigits}${extension}`; // Combine timestamp, random digits, and extension
    cb(null, filename);  // Save file with the new filename
  },
});

const upload = multer({ storage: storage });
