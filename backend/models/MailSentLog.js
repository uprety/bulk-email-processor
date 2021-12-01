const mongoose = require('mongoose')

const mailSentLogSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    logs: {
        type: [String],
        required: true,
    },
},)

const MailSentLog = mongoose.model('mail-sent-log', mailSentLogSchema)

module.exports = MailSentLog 