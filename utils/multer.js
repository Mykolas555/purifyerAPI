const multer = require('multer');
const path = require('path');

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const randomString = generateRandomString(5);
    cb(null, Date.now() + randomString + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

module.exports = upload;
