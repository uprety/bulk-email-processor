const express = require('express')
const apiRouter = express.Router()
const {IsAuth} = require('../middleware/IsAuth')

const {SignUp, SignIn, SignOut, VerifyEmail, isSendAllowed} = require('../controllers/UserController')

// ------Handling user login process----------

// Routes for signup
apiRouter.post('/signup', SignUp)

// Routes for login
apiRouter.post('/signin', SignIn)

// Routes for logout
apiRouter.get('/logout', SignOut)

// Routes for veryfying email token
apiRouter.get('/verify-email/:verificationToken', VerifyEmail)

// Replying to reques if the it is authorized
apiRouter.get('/am-I-allowed-to-send-mail', IsAuth, isSendAllowed)


module.exports = apiRouter