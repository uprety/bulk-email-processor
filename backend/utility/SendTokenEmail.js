const nodemailer = require("nodemailer");

const SendTokenEmail = async (to, tokenURL) => {
    const transporter = nodemailer.createTransport({
    host: process.env.BEP_MAILTRAP_HOST,
    port: 2525,
    secure: false, 
    auth: {
      user: process.env.BEP_MAILTRAP_USERNAME,
      pass: process.env.BEP_MAILTRAP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"No Reply 👻" <no-reply@bulkemailxyz.com>', // sender address
    to: to,
    subject: "Email Verification",
    text: `Bulk Email Processor account activation link: ${tokenURL}`,
    html: `<p>Bulk Email Processor account activation link: <a href='${tokenURL}'>${tokenURL}</a></p>`, 
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = SendTokenEmail