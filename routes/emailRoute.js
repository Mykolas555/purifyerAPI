const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController'); // Create this next

// Define the route for sending emails
router.post('/send-email', emailController.sendEmail);

module.exports = router;
