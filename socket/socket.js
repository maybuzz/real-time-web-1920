console.log("socket")

const { io }    = require('../server')
const fetch     = require('node-fetch')
const cookie    = require('cookie')
const qs        = require('qs')
const { userJoin }  = require('./../utils/users')
const { getCurrentUser }  = require('./../utils/users')
const { userLeave }  = require('./../utils/users')
const { getRoomUsers }  = require('./../utils/users')

// SOCKET SETUP
io.on('connection', function(socket) {
  console.log('user connected ' + '(' + socket.id + ')')

  const cookies = cookie.parse(socket.request.headers.cookie)
  const token = cookies.access_token
  const albumId = cookies.albumId

  let id = socket.id
  let userName = 'anonymous'

  const albums = []

  socket.on('joinRoom', function({ room }) {
    const roomUsers = getRoomUsers(room)

    console.log(`- welcome to room ${room} -`)

    const user = userJoin(socket.id, room)

    socket.join(user.room)

    socket.emit('server message', `// welcome to the album //`)
    socket.broadcast.to(user.room).emit('server message', `"${userName}" joined the room`)

    // send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })

    socket.on('set user', function(id) {
      const oldUsername = userName
      userName = id

      console.log(`user with id ${userName} connected`)
      socket.emit('server message', `we'll call you "${userName}" now`);
      socket.broadcast.to(user.room).emit('server message', `"${oldUsername}" is called "${userName}" now`)
    })

    socket.on('chat message', function(msg) {
      console.log('message: ' + msg)
      socket.emit('chat message', `${msg}`)
      socket.broadcast.to(user.room).emit('recieve message', `${userName}: ${msg}`)
    })

    // play pause album
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

      io.to(user.room).emit('play track', `${album}`)
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

      io.to(user.room).emit('pause track', `${album}`)
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

      socket.emit('leave room', `${album}`)
    })
  })

  // socket disconnects
  socket.on('disconnect', function(){
    console.log(`${userName} ${id} disconnected`)

    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit('server message', `"${userName}" has left the room`)

      // send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }

  })

})
