const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.BEP_MAILTRAP_HOST,
    port: 2525,
    secure: false,
    auth: {
        user: process.env.BEP_MAILTRAP_USERNAME,
        pass: process.env.BEP_MAILTRAP_PASSWORD,
    },
});

module.exports = transporter;