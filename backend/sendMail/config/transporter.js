const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.BEP_MAILTRAP_HOST,
    port: process.env.BEP_MAILTRAP_PORT,
    secure: false,
    auth: {
        user: process.env.BEP_MAILTRAP_USERNAME,
        pass: process.env.BEP_MAILTRAP_PASSWORD,
    },
    pool: true,
    maxConnections: 1,
    rateDelta: 20000,
    rateLimit: 5,
});

module.exports = transporter;