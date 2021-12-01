const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    templateNumber: {
        type: String,
        unique: true,
        required: true,
    },
    from: {
        type: String,
        lowercase: true,
        require: true,
    },
    to: {
        type: String,
        lowercase: true,
        require: false,
    },
    cc: {
        type: String,
        lowercase: true,
        require: false,
    },
    bcc: {
        type: String,
        lowercase: true,
        require: false,
    },
    subject: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: { 
        type: Date, default: Date.now
    },

});

const MailTemplateSchema = mongoose.model('mail-template', UserSchema);

module.exports = MailTemplateSchema;