const express = require('express');
const userController = require('../controllers/userController');
const validateID = require('../utils/validators');

const router = express.Router();


router.get('/',  userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:ID', validateID, userController.getUserById);
router.delete('/users/:ID', userController.deleteUser);

module.exports = router;
