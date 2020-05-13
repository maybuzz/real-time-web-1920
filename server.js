console.log("server")

const express    = require('express')
const app        = express()
const port       = process.env.PORT

const http       = require('http').Server(app)
const io         = require('socket.io')(http)

const cookie     = require('cookie')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path       = require('path')
const ejs        = require('ejs')

require('dotenv').config()

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
	.set('view engine', 'ejs')
	.set('views', path.join(__dirname, 'src/views'))
  .use(express.static('src/static'))
  .use(cookieParser())

// PORT
http.listen(port, function() {
	console.log('listening on: ' + port)
})

module.exports = { app, http, io }
