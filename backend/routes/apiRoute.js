const express = require('express')
const apiRouter = express.Router()
const {IsAuth} = require('../middleware/IsAuth')

const {SignUp, SignIn, SignOut, VerifyEmail, ProcessMailJobs, SendEmailTemplateToClient} = require('../controllers/UserController')

// ------Handling user login process----------

// Routes for signup
apiRouter.post('/signup', SignUp)

// Routes for login
apiRouter.post('/signin', SignIn)

// Routes for logout
apiRouter.get('/logout', SignOut)

// Routes for veryfying email token
apiRouter.get('/verify-email/:verificationToken', VerifyEmail)

// Replying to reques if the it is authorized/ Providing list of email template
apiRouter.get('/am-I-allowed-to-send-mail', IsAuth, SendEmailTemplateToClient)

// For receiving the list of emali for bulk email execution
// This is when user hit login button
apiRouter.post('/process-mail-jobs', IsAuth, ProcessMailJobs)

module.exports = apiRouter 