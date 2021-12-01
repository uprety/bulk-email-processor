// const nodemailer = require("nodemailer")
const transporter = require('./config/transporter')

const SendTokenEmail = async (to, tokenURL) => {

  let info = await transporter.sendMail({
    from: '"No Reply 👻" <no-reply@bulkemailxyz.com>',
    to: to,
    subject: "Email Verification",
    text: `Bulk Email Processor account activation link: ${tokenURL}`,
    html: `<p>Bulk Email Processor account activation link: <a href='${tokenURL}'>${tokenURL}</a></p>`, 
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = SendTokenEmail