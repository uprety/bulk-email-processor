const express = require('express')
const mongoose = require('mongoose') // A high level mongodb interface for general purpose
const MongoStore = require('connect-mongo') // For session purpose only
const session = require('express-session'); // For session middleware
const cors = require('cors')

const apiRoutes = require('./routes/apiRoute')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  credentials: true,
  origin: ['*', 'http://localhost:3000']
}))

// set morgan to log info about our requests for development use only
if (process.env.BEP_ENV === 'development') {
  console.log("you are here at development")
  const logger = require("morgan") 
  app.use(logger("dev"));
}

mongoose.connect(process.env.BEP_MONGODB_URL, {
  keepAliveInitialDelay: 36000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
})
  .then((res) => {
    console.log("MongoDB Connected")
  })
  .catch(err => console.log(err))


app.use(session({
  
  secret: process.env.BEP_SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.BEP_MONGODB_URL,
    touchAfter: 60*60*24,
  }),
}));

app.use('/api', apiRoutes)

const port = process.env.BEP_SERVER_PORT
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})