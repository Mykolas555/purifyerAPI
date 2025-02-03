const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net', // Mailgun SMTP server
    port: 587, // Port for SMTP
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'MS_ZTyC1T@trial-ynrw7gy7j1og2k8e.mlsender.net', // Your Mailgun SMTP username
        pass: 'mssp.2bK8bC5.0r83ql3m7dzgzw1j.gemNKPM' // Your Mailgun API key
    }
});

module.exports = transporter; // Export the transporter for reuse