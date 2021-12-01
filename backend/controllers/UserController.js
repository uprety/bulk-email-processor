const bcrypt = require('bcrypt')
const { v4: uuid } = require('uuid')

const EmailTokenModel = require('../models/EmailTokenModel');
const SendTokenEmail = require('../sendMail/SendTokenEmail')
const UserModel = require('../models/UserModel');
const MailTemplateSchema = require('../models/MailTemplate')
const SendMail = require('../sendMail/SendBulkMail')

exports.SignUp = async (req, res) => {
    const { username, email, password } = req.body

    // check if email already present in UserModel
    let user = await UserModel.findOne({ email })
    if (user) {
        res.status(403).json({ "isSuccess": false, "comment": "email already registered" })
    } else {
        // save the user in EmailToken with token untill verification
        const hashedPwd = await bcrypt.hash(password, 10);
        const token = uuid()
        const tokenURL = `${process.env.BEP_SERVER_URL}/api/verify-email/${token}`
        user = new EmailTokenModel({
            token: token,
            username,
            email,
            password: hashedPwd,
        })
        await user.save()
        SendTokenEmail(email, tokenURL)

        res.json({ "isSuccess": true, "comment": "Follow the link provided through the email" })
    }
}

exports.SignIn = async (req, res) => {
    // Two things happes 1. auth success 2. auth fail
    const { email, password } = req.body
    const user = await UserModel.findOne({ email });
    if (!user) {
        res.status(400).json({ "isSuccess": false, "comment": "Email Address Not Found" })
    } else {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({ "isSuccess": false, "comment": "Invalid password" })
        } else {
            // sign a session here
            req.session.email = email
            req.session.save()
            res.json({ "isSuccess": true, "comment": "Login Success" })
        }
    }
}

exports.SignOut = async (req, res) => {
    if (req.session.email) {
        req.session.destroy()
        res.json({ "isSuccess": true, "comment": "Logout Success" })
    } else {
        res.json({ "isSuccess": true, "comment": "Already Logged Out" })
    }
}

exports.VerifyEmail = async (req, res) => {
    const verificationToken = req.params.verificationToken
    EmailTokenModel.findOneAndDelete(
        { 'token': verificationToken },
        // 'username email password',
        (err, user) => {
            if (err || !user) {
                res.status(410).json({ "isSuccess": false, "comment": "Something wrong with token" })
            } else {
                const save_response = new UserModel({
                    username: user.username,
                    email: user.email,
                    password: user.password
                })
                save_response.save()
                res.json({ "isSuccess": true, "comment": "Email Verification Successful" })
            }
        },
    )
}

exports.SendEmailTemplateToClient = async (req, res) => {
    MailTemplateSchema.find({}, (err, mailTemplates) => {
        const mailBody = []
        mailTemplates.forEach(mailTemplate => {
            mailBody.push({ id: mailTemplate.templateNumber, subject: mailTemplate.subject })
        })
        res.json({ "isSuccess": true, "comment": "Authorized to send bulk email", "mailTemplates": mailBody })
    })
}

exports.ProcessMailJobs = async (req, res) => {
    const body = {
        recipients: req.body.recipients,
        selectedTemplateId: req.body.selectedTemplateId,
    }
    if (!body.recipients || body.selectedTemplateId === '') {
        res.status(400).json({ "isSuccess": false, "comment": "Invalid payload provided" })
    } else {
        MailTemplateSchema.findOne({ templateNumber: body.selectedTemplateId}, 'templateNumber from cc bcc subject html text',(err, mailTemplate) => {
            if (err) {
                res.status(404).json({ "isSuccess": false, "comment": "Tempalte Not Found in Database." })
            } else {
                SendMail(mailTemplate._doc, body.recipients, req.session.email)
                res.json({ "isSuccess": true, "comment": "Successful Received the Task" })
            }
        }
        )
    }
}