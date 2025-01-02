const User = require('../models/userModel');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Validate inputs
    if (!nickname || !password) {
      return res.status(400).json({ message: 'Nickname and password are required' });
    }

    // Create the user
    const newUser = await User.create({ nickname, password });

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: newUser._id,
          nickname: newUser.nickname,
        },
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};
