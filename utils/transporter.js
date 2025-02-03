const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org', // Mailgun SMTP server
    port: 587, // Port for SMTP
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'postmaster@YOUR_MAILGUN_DOMAIN', // Your Mailgun SMTP username
        pass: 'YOUR_MAILGUN_API_KEY' // Your Mailgun API key
    }
});

module.exports = transporter; // Export the transporter for reuse