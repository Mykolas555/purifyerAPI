const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
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
    const user = await User.findById(req.params.ID).select('-password');
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
    // Cheking if required items are in req body
    const { nickname, password, passwordConfirm, role } = req.body;
    if (!nickname || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'Nickname, password, and password confirmation are required.' });
    }
    // Cheking if passwords match
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Password and password confirmation do not match.' });
    }
    // Hashing password and save user with hashed password
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      nickname,
      password: hashedPassword,
      role: role || 'user',
    });
    await user.save();
    res.status(201).json({
      message: 'User created successfully!',
      user: { nickname: user.nickname, role: user.role },
    });
  } catch (error) {
    console.error("Error creating user:", error); // Log the error for debugging
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Nickname already exists.' });
    }
    console.log(error)
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { ID } = req.params;
    const userIdFromToken = req.user._id;
    // Check if the user is trying to delete themselves
    if (userIdFromToken === ID) {
      return res.status(403).json({ message: 'You cannot delete your own account' });
    }
    // Find and delete the user
    const user = await User.findByIdAndDelete(ID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Sending status
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { nickname, password } = req.body;
    // Validate if nickname and password are provided
    if (!nickname || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both nickname and password',
      });
    }
    // Find user by nickname
    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }
    // Check if password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }
    // Create JWT token using secret from .env file
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          nickname: user.nickname,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};