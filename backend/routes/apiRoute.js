const express = require('express')
const apiRouter = express.Router()
const {IsAuth} = require('../middleware/IsAuth')

const {SignUp, SignIn, SignOut, VerifyEmail, SendMailTask} = require('../controllers/UserController')

// ------Handling user login process----------

// Routes for signup
apiRouter.post('/signup', SignUp)

// Routes for login
apiRouter.post('/signin', SignIn)

// Routes for logout
apiRouter.get('/logout', SignOut)


// Routes for veryfying email token
apiRouter.get('/verify-email/:verificationToken', VerifyEmail)

// Routes for adding bulk email id
apiRouter.get('/send-mail-task', IsAuth, SendMailTask)
// Routes for sending bulk email
// Routes for getting history

module.exports = apiRouter