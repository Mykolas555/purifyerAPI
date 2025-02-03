const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org', // Mailgun SMTP server
    port: 587, // Port for SMTP
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'MS_BUel56@trial-ynrw7gy7j1og2k8e.mlsender.net', // Your Mailgun SMTP username
        pass: 'mssp.BCugfN4.7dnvo4d35wrg5r86.J8qh6AB' // Your Mailgun API key
    }
});

module.exports = transporter; // Export the transporter for reuse