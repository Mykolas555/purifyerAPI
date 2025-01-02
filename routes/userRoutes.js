const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route for creating a user
router.post('/create', userController.createUser);

module.exports = router;
