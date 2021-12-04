const express = require('express')
const path = require('path')
const mongoose = require('mongoose') // A high level mongodb interface for general purpose
const MongoStore = require('connect-mongo') // For session purpose only
const session = require('express-session'); // For session middleware
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')
const apiRoutes = require('./routes/apiRoute');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  credentials: true,
  origin: "*" 
}))
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: "*" 
  }
})

// set morgan to log info about our requests for development use only
if (process.env.BEP_ENV === 'dev') {

  console.log("you are here at development")
  const logger = require("morgan") 
  app.use(logger("development"));

  // Running message queue consume in background for development only
  // This need to run seperate container. For that run following
  // npm run consumeQueue
  // const spawn = require('child_process').spawn
  // spawn('node', ['sendMail/ComsumeBulkMailQueueJob.js'], {
  //   detached: true
  // }).unref();

} else {
  console.log("You are running a production version")
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


io.on('connection', socket => {

  console.log(`${socket.id} is connected`)

  socket.on('disconnect', () =>{
    console.log(`${socket.id} is disconnected`)
  })
  console.log()
})

const ProcessSingleEmail = require('./controllers/ProcessSingleEmail')(io)
app.post('/process-single-email', ProcessSingleEmail)


app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

const port = process.env.PORT || 3030
server.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://0.0.0.0:${port}`)
})