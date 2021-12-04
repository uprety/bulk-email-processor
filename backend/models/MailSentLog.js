const mongoose = require('mongoose')

const mailSentLogSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    logs: [{
        to: { type: String },
        from: { type: String },
        status: { type: String },
    }],
})

const MailSentLog = mongoose.model('mail-sent-log', mailSentLogSchema)

module.exports = MailSentLog