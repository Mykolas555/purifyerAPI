const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "479a1f69a580ef5563745bdf4a1f0f32"
    }
});


module.exports = transporter; // Export the transporter for reuse