console.log("app");

const routes     = require('./server/modules/routes')
const oauth      = require('./server/modules/oauth')

const bodyParser = require('body-parser')
const fetch      = require('node-fetch')
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
        resave: true,
        saveUninitialized: true
    }))
  .use(oauth)
  .use('/', routes)
  .use('/login', routes)
  .use('/room/:id', routes)
  .use('/room1', routes)
  .use('/room2', routes)
  .use('/room3', routes)
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

    function playAlbum(album){

      return fetch(`https://api.spotify.com/v1/me/player/play`,
      {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + album.token
        },
        body: JSON.stringify({
          context_uri: album.uri
        })
      }).then((response) => response.json())
    }

    playAlbum(album)

    // console.log('album: ', album.uri);
    //
    // console.log("token", album.token);

    io.emit('play track', `${album}`);
  });

  socket.on('pause album', function(album) {

    function pauseAlbum(album){

      return fetch(`https://api.spotify.com/v1/me/player/pause`,
      {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + album.token
        },
        body: JSON.stringify({
          context_uri: album.uri
        })
      }).then((response) => response.json())
    }

    pauseAlbum(album)

    // console.log('album: ', album.uri);
    //
    // console.log("token", album.token);

    io.emit('pause track', `${album}`);
  });

  socket.on('leave room', function(album) {

    function pauseAlbum(album){

      return fetch(`https://api.spotify.com/v1/me/player/pause`,
      {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + album.token
        },
        body: JSON.stringify({
          context_uri: album.uri
        })
      }).then((response) => response.json())
    }

    pauseAlbum(album)

    io.emit('leave room', `${album}`);
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
