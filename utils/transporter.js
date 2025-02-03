const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org', // Mailgun SMTP server
    port: 587, // Port for SMTP
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'mykolasburner@gmail.com', // Your Mailgun SMTP username
        pass: 'mlsn.c5056a80cebbadd4c4a82e027d5f11e024f44f3154b37856a70898646b552cc3' // Your Mailgun API key
    }
});

module.exports = transporter; // Export the transporter for reuse