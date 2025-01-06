const express = require('express');
const messageController = require('../controllers/messageController');
const validateID = require('../utils/validators');
const router = express.Router();

// Route to get all messages
router.get('/', messageController.getAllMessages);
router.post('/', messageController.createMessage);
router.delete('/delete/:ID', validateID,  messageController.deleteMessage);
// Route to get a message by ID
router.get('/:ID', validateID, messageController.getMessageById);


module.exports = router;
