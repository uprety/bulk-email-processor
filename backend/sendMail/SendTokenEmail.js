// const nodemailer = require("nodemailer")
const transporter = require('./config/transporter')

const SendTokenEmail = async (to, tokenURL) => {

  let info = await transporter.sendMail({
    from: '"No Reply 👻" <no-reply@bulkemailxyz.com>',
    to: to,
    subject: "Email Verification",
    text: `Hello ${to}, Your Bulk Email Processor account activation link: ${tokenURL}`,
    html: `<h2>Hello ${to},</h2><p>Bulk Email Processor account activation link: <a href='${tokenURL}'>${tokenURL}</a></p>`, 
  });

  console.log(`Email verification sent to ${info.messageId}`);
}

module.exports = SendTokenEmail