const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailosaur.net',
    port: 587,
    secure: false,
    auth: {
        user: 'zxm5nxos@mailosaur.net',
        pass: 'WYIz0Lagl1CgYGeFhB4UGRRXqxlIjZgj'
    }
});


module.exports = transporter; // Export the transporter for reuse