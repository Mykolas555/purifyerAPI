const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
        user: '2ff443ce681b5bc',
        pass: '144533935687eb'
    }
});

module.exports = transporter; // Export the transporter for reuse