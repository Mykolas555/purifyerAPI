const mongoose = require('mongoose');
const User = require('../models/userModel');

const adminRestrict = async (req, res, next) => {
  try {
    const ID = req.params.ID;
    const user = await User.findById(ID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = adminRestrict;