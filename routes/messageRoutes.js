const express = require('express');
const messageController = require('../controllers/messageController');
const validateID = require('../utils/validators');
const router = express.Router();

// Route to get all messages
router.get('/', messageController.getAllMessages);
router.post('/', messageController.createMessage);
// Route to get a message by ID
router.get('/:ID', validateID, messageController.getMessageById);
router.delete('/:ID', validateID,  messageController.deleteMessage);

module.exports = router;
