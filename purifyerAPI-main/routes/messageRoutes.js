const express = require('express');
const messageController = require('../controllers/messageController');
const validateID = require('../utils/validators');
const validatorToken = require('../utils/validatorToken');
const adminRestrict = require('../utils/adminRestrict');

const router = express.Router();

router.get('/', validatorToken, messageController.getAllMessages);
router.post('/', messageController.createMessage);
router.get('/export-messages', validatorToken, messageController.exportMessagesToExcel);
router.delete('/delete/:ID', validateID, validatorToken, adminRestrict,  messageController.deleteMessage);
router.get('/:ID', validateID, validatorToken, messageController.getMessageById);

module.exports = router;