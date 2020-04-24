console.log("app");

const routes     = require('./server/modules/routes')
const oauth      = require('./server/modules/oauth')
const bodyParser = require('body-parser')
const path       = require('path')
const ejs        = require('ejs')
const session    = require('express-session')
const express    = require('express')
const app        = express()
const http       = require('http').Server(app)
const io         = require('socket.io')(http)
const port       = process.env.PORT || 3000

require('dotenv').config()

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(session({
        secret: 'get-a-room',
        cookie: {secure:false},
        resave: false,
        saveUninitialized: true
    }))
  .use(oauth)
  .use('/', routes)
  .use('/login', routes)
  .use('/room', routes)
	.set('view engine', 'ejs')
	.set('views', path.join(__dirname, 'src/views'))
  .use(express.static('src/static'))

http.listen(port, function() {
	console.log('listening on: ' + port)
})
