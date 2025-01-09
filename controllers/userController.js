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
    const { nickname, password, passwordConfirm, role } = req.body;

    // Validate input
    if (!nickname || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'Nickname, password, and password confirmation are required.' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Password and password confirmation do not match.' });
    }

    // Hash password using bcryptjs before saving the user
    const hashedPassword = await bcrypt.hash(password, 12); // Salt rounds = 12 is recommended for security

    // Create a new user instance with the hashed password
    const user = new User({
      nickname,
      password: hashedPassword,  // Store hashed password
      role: role || 'user',  // Optional role, default 'user'
    });

    // Save user to database
    await user.save();

    // Send response without the token
    res.status(201).json({
      message: 'User created successfully!',
      user: { nickname: user.nickname, role: user.role },  // Return user details excluding sensitive info
    });
  } catch (error) {
    // Handle duplicate nickname error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Nickname already exists.' });
    }

    // Handle validation errors (Mongoose)
    if (error.errors) {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }

    // General server error
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};



// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { ID } = req.params; // ID of the user to delete
    const userIdFromToken = req.user._id; // ID of the user making the request

    console.log("Controller received ID:", ID);
    console.log("Requesting user's ID:", userIdFromToken);

    // Check if the user is trying to delete themselves
    if (userIdFromToken === ID) {
      return res.status(403).json({ message: "You cannot delete your own account." });
    }

    // Proceed to delete the user
    const user = await User.findByIdAndDelete(ID);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteUser controller:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
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
      { id: user._id, role: user.role }, // Payload
      process.env.JWT_SECRET,  // Secret from .env file
      { expiresIn: '1h' }  // Token expiration time (1 hour)
    );

    // Send response with token and user details
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        token,   // JWT token
        user: {
          id: user._id,     // User ID
          nickname: user.nickname,   // User nickname
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