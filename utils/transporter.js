const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_PROVIDER_USER,
        pass: process.env.EMAIL_PROVIDER_PASS
    }
});


module.exports = transporter; // Export the transporter for reuse