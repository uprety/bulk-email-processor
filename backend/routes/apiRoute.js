const express = require('express')
const apiRouter = express.Router()
const {IsAuth} = require('../middleware/IsAuth')

const {SignUp, SignIn, SignOut, VerifyEmail, ProcessMailJobs, SendEmailTemplateToClient, GetSentEmailLogs} = require('../controllers/UserController')

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

// when user hit submit btn with list of recipients and selected template
// for schudling bulk exuction
apiRouter.post('/process-mail-jobs', IsAuth, ProcessMailJobs)

// For sending already save logs  in databse
apiRouter.get('/get-sent-email-logs', IsAuth, GetSentEmailLogs)

// For sending socket message to connected client; perform send mail task
// apiRouter.post('/process-single-email', ProcessSingleEmail)


module.exports = apiRouter 