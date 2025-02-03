const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org', // Mailgun SMTP server
    port: 587, // Port for SMTP
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'MS_Ah36WQ@trial-ynrw7gy7j1og2k8e.mlsender.net', // Your Mailgun SMTP username
        pass: 'mssp.btDDIqC.zr6ke4n8dov4on12.aBPjuuw' // Your Mailgun API key
    }
});

module.exports = transporter; // Export the transporter for reuse