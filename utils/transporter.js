const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false,
    auth: {
        user: process.env.EMAIL_PROVIDER_USER,
        pass: process.env.EMAIL_PROVIDER_PASS
    }
});


module.exports = transporter; // Export the transporter for reuse