const express = require('express');
const userController = require('../controllers/userController');
const validateID = require('../utils/validators');
const validatorToken = require('../utils/validatorToken');
const adminRestrict = require('../utils/adminRestrict');

const router = express.Router();


router.get('/', validatorToken, userController.getAllUsers);
router.post('/', validatorToken, adminRestrict, userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:ID', validateID, validatorToken, userController.getUserById);
router.delete('/users/:ID', validateID, validatorToken, adminRestrict, userController.deleteUser);

module.exports = router;
