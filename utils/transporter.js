const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail's SMTP service
    auth: {
        user: process.env.EMAIL_PROVIDER_USER, // Replace with your Gmail address
        pass: process.env.EMAIL_PROVIDER_PASS,  // Replace with your Gmail password
    },
});


module.exports = transporter; // Export the transporter for reuse