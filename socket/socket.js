const { io } = require('../server')
const fetch = require('node-fetch')

// SOCKET SETUP
io.on('connection', function(socket) {
	console.log('user connected ' + '(' + socket.id + ')')

  let id = socket.id
  let userName = 'anonymous'

  // socket.on('set user', function(id) {
  //   console.log("id", id);
  //   const oldUsername = userName;
  //   userName = id;
  //   console.log(`user with id ${userName} connected`);
  //   socket.emit('server message', `SERVER: Your username was changed to ${userName}.`);
  //   socket.broadcast.emit('server message', `SERVER: User ${oldUsername} changed their name to ${userName}.`);
  // });

  socket.emit('server message', `Welcome to the album.`)
  socket.broadcast.emit('server message', `${userName} ${id} connected.`)

  socket.on('disconnect', function(){
    console.log(`${userName} ${id} disconnected`)
    io.emit('server message', `${userName} ${id} disconnected.`)
  })

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg)
    io.emit('chat message', `${userName}: ${msg}`)
  })

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

    io.emit('play track', `${album}`)
  })

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

    io.emit('pause track', `${album}`)
  })

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

    io.emit('leave room', `${album}`)
  })

})
