const mongoose = require('mongoose');
// Middleware to validate ID in params
const validateID = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.ID)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid ID format',
    });
  }
  next();
};

module.exports = validateID;