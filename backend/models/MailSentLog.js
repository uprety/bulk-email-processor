const mongoose = require('mongoose')

const mailSentLogSchema = new mongoose.Schema({
    email: {
        type: String, 
    },
    logs: {
        type: [String],
        required: true,
    },
},)

const MailSentLog = mongoose.model('mail-sent-log', mailSentLogSchema)

module.exports = MailSentLog 