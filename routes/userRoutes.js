const express = require('express');
const userController = require('../controllers/userController');
const validateID = require('../utils/validators');

const router = express.Router();


router.get('/',  userController.getAllUsers);

// Route to get a single user by ID
router.get('/:ID', validateID, userController.getUserById);


module.exports = router;
