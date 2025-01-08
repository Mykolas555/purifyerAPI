const User = require('../models/userModel');

const adminRestrict = async (req, res, next) => {
  try {
    // Get the ID from the URL parameters and the ID from the user (in the request object)
    const { ID } = req.params;
    const userIdFromToken = req.user._id; // Get the user ID from the token

    // Check if the user is trying to modify their own data
    if (userIdFromToken === ID) {
      return next(); // If the user is modifying their own data, allow it
    }

    // Otherwise, check if the user has admin privileges
    console.log(userIdFromToken)
    console.log(ID)
    const user = await User.findById(userIdFromToken); // Find the user from the decoded token
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