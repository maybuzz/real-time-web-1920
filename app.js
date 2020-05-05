console.log("app");

const routes     = require('./server/modules/routes')
const oauth      = require('./server/modules/oauth')
const {playAlbum} = require('./server/modules/helper')

const bodyParser = require('body-parser')
const fetch = require('node-fetch')
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
  .use('/room/:id', routes)
	.set('view engine', 'ejs')
	.set('views', path.join(__dirname, 'src/views'))
  .use(express.static('src/static'))

// SOCKETS
io.on('connection', function(socket) {
	console.log('user connected ' + '(' + socket.id + ')')

  let id = socket.id
  let userName = 'anonymous'

  // const albumId = req.params.id

  // console.log("album", albumId);

  // socket.on('set user', function(id) {
  //   console.log("id", id);
  //   const oldUsername = userName;
  //   userName = id;
  //   console.log(`user with id ${userName} connected`);
  //   socket.emit('server message', `SERVER: Your username was changed to ${userName}.`);
  //   socket.broadcast.emit('server message', `SERVER: User ${oldUsername} changed their name to ${userName}.`);
  // });

  socket.emit('server message', `SERVER: Welcome to the void.`);
  socket.broadcast.emit('server message', `SERVER: ${userName} ${id} connected.`);

  socket.on('disconnect', function(){
    console.log(`${userName} ${id} disconnected`);
    io.emit('server message', `SERVER: ${userName} ${id} disconnected.`);
  });

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', `${userName}: ${msg}`);
  });

  socket.on('play album', function(album) {
    console.log('album: ' + album);

    io.emit('play track', `${album}`);
  });
})

// io.on('connection', function(socket) {
// 	console.log('user connected ' + '(' + socket.id + ')')
//
//   socket.emit('newConnection', {id: socket.id})
//   socket.on('welcome', (data) => {
//     console.log("server", socket.id);
//   })
//
//   socket.emit('room')
//
// 	socket.on('chatMessage', function(msg) {
// 		socket.broadcast.emit('chatMessage', {message: msg})
// 	})
//
// 	socket.on('disconnect', function() {
// 		console.log('user disconnected ' + '(' + socket.id + ')')
//     io.emit('chat message', '')
// 	})
// })

// PORT
http.listen(port, function() {
	console.log('listening on: ' + port)
})
