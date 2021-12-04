const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport(process.env.BEP_MAILTRAP_CREDENTIAL)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Mail Server is ready");
    }
});


module.exports = transporter;