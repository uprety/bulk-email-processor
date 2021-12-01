const transporter = require("./config/transporter")
const MailTemplateSchema = require('../models/MailTemplate')
const MailSentLog = require('../models/MailSentLog')

const SendBulkMail = async (mailTemplate, recipients, initiator) => {

    recipients.forEach(recipient => {


        const mailOptions = { ...mailTemplate, to: recipient}
        transporter.sendMail(mailOptions, (error, info) =>{
            console.log(`Message sent: ${info.messageId} to ${to}`);
        })

    })

}

module.exports = SendBulkMail