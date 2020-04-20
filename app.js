'use strict'

const path = require('path')
const ejs = require('ejs')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

require('dotenv').config()

app
	.use(express.static(path.join(__dirname, 'src/static')))
	.use(express.urlencoded({ extended: true }))
	.use(express.json())
	.set('view engine', 'ejs')
	.set('views', path.join(__dirname, 'src/views'))
  .get('/', index)



// templates
function index(req, res){
  res.render('index')
}

http.listen(port, function() {
	console.log('listening on: ' + port)
})
