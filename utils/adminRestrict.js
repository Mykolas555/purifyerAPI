const User = require('../models/userModel');

const adminRestrict = async (req, res, next) => {
  try {
    const userIdFromToken = req.user._id; // Get the user ID from the token

    // Check if the user has admin privileges
    const user = await User.findById(userIdFromToken);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }

    next(); // Proceed to the next middleware/controller if the user is an admin
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = adminRestrict;
