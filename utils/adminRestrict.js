const User = require('../models/userModel');

// Middleware to check if the user performing the action is an admin
const adminRestrict = async (req, res, next) => {
  try {
    // Check if the user performing the action is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = adminRestrict;
