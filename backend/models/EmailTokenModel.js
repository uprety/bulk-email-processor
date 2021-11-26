const mongoose = require('mongoose')

const EmailTokenSchema = new mongoose.Schema({
    token: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now
    },
    username: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
},)
EmailTokenSchema.index({"lastModifiedDate": 1 },{ expireAfterSeconds: 3600 })

const EmailTokenModel = mongoose.model('EmailToken', EmailTokenSchema)

module.exports = EmailTokenModel