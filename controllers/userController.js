const User = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.ID);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Create User
exports.createUser = async (req, res) => {
  try {
    const { nickname, password, passwordConfirm, role } = req.body;

    // Validate input
    if (!nickname || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'Nickname, password, and password confirmation are required.' });
    }

    // Check if password and passwordConfirm match
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Password and password confirmation do not match.' });
    }

    // Create and save the user
    const user = new User({ nickname, password, passwordConfirm, role });
    await user.save();

    res.status(201).json({ message: 'User created successfully!', user });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Nickname already exists.' });
    }
    if (error.errors) {
      // Handle validation errors
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { ID } = req.params;
    const user = await User.findByIdAndDelete(ID);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User deleted successfully!', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};