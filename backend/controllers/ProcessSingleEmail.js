const transporter = require('../sendMail/config/transporter');
const MailSentLog = require('../models/MailSentLog')


const ProcessSingleEmail = (io) => {
    return async(req, res) => {
        req.session.email
        let mail = req.body
        
        // modify the mail body here

        mail.html = mail.html.replaceAll('{{receiver}}', mail.to)
        mail.text = mail.text.replaceAll('{{receiver}}', mail.to)

        console.log(`-----------Sending mail to ${mail.to}------------`)

        // Comlete the mail task
        transporter.sendMail(mail, (error, info) => {
            if (!error && info) {
                const mailSentStatus = {
                    to: info.envelope.to[0],
                    from: info.envelope.from,
                    status: info.response
                }


                MailSentLog.findOneAndUpdate(
                    { email: mail.initiator },   // query
                    { $push: { logs: mailSentStatus } },  // update
                    { upsert: true, new: true, setDefaultsOnInsert: true }, // options
                    (err, succ) => {
                        if (err) {
                            const errMessage = `------------------ Writing mail send log to database of ${mail.to}`
                            console.log(errMessage)
                            res.json({ "isSuccess": false, "comment": errMessage })
                        } else {
                            io.emit(mail.initiator, mailSentStatus)
                            res.json({ "isSuccess": true, "comment": mailSentStatus })
                        }
                    }
                )
            } else {
                console.log(`Something went wrong with recipient: ${mail.to}`)
                res.json({ "isSuccess": false, "comment": `Something went wrong with recipient: ${mail.to} while sending emal` })
            }
        })
    }
}

module.exports = ProcessSingleEmail