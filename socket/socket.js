console.log("socket")

const { io } = require('../server')
const fetch = require('node-fetch')
const cookie = require('cookie')

// SOCKET SETUP
io.on('connection', function(socket) {
	console.log('user connected ' + '(' + socket.id + ')')

  const cookies = cookie.parse(socket.request.headers.cookie)
  const token = cookies.access_token

  let id = socket.id
  let userName = 'anonymous'

  socket.on('set user', function(id) {
    const oldUsername = userName
    userName = id

    console.log(`user with id ${userName} connected`)
    socket.emit('server message', `- your username was changed to "${userName}" -`);
    socket.broadcast.emit('server message', `- user ${oldUsername} changed their name to "${userName}" -`)
  })

  socket.emit('server message', `- welcome to the album -`)
  socket.broadcast.emit('server message', `${userName} ${id} connected.`)

  socket.on('disconnect', function(){
    console.log(`${userName} ${id} disconnected`)
    io.emit('server message', `- ${userName} ${id} disconnected -`)
  })

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg)
    socket.emit('chat message', `${msg}`)
    socket.broadcast.emit('recieve message', `${userName}: ${msg}`)
  })

  // socket.on('recieve message', function(msg) {
	// 	socket.broadcast.emit('recieve message', `${userName}: ${msg}`)
	// })

  socket.on('play album', function(album) {

    function playAlbum(album){

        return fetch(`https://api.spotify.com/v1/me/player/play`,
        {
          method: "PUT",
          headers: {
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            context_uri: album.uri
          })
        }).then((response) => response )
    }

    playAlbum(album)

    // console.log('album: ', album.uri);
    //
    // console.log("token", album.token);

    io.emit('play track', `${album}`)
  })

  socket.on('pause album', function(album) {

    function pauseAlbum(album){

      return fetch(`https://api.spotify.com/v1/me/player/pause`,
      {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          context_uri: album.uri
        })
      }).then((response) => response)
    }

    pauseAlbum(album)

    io.emit('pause track', `${album}`)
  })

  socket.on('leave room', function(album) {

    function pauseAlbum(album){

      return fetch(`https://api.spotify.com/v1/me/player/pause`,
      {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          context_uri: album.uri
        })
      }).then((response) => response)

    }

    pauseAlbum(album)

    io.emit('leave room', `${album}`)
  })

})
