console.log("socket")

const { io }    = require('../server')
const fetch     = require('node-fetch')
const cookie    = require('cookie')
const qs        = require('qs')
const { userJoin }  = require('./../controls/users')
const { getCurrentUser }  = require('./../controls/users')
const { userLeave }  = require('./../controls/users')
const { getRoomUsers }  = require('./../controls/users')

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

    io.to(user.room).emit('server message', `- welcome to the album -`)
    socket.broadcast.to(user.room).emit('server message', `${userName} ${id} connected.`)

    socket.on('set user', function(id) {
      const oldUsername = userName
      userName = id

      console.log(`user with id ${userName} connected`)
      io.to(user.room).emit('server message', `- your username was changed to "${userName}" -`);
      socket.broadcast.to(user.room).emit('server message', `- user ${oldUsername} changed their name to "${userName}" -`)
    })

    socket.on('chat message', function(msg) {
      console.log('message: ' + msg)
      io.to(user.room).emit('chat message', `${msg}`)
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

      io.to(user.room).emit('leave room', `${album}`)
    })
  })

  // socket disconnects
  socket.on('disconnect', function(){
    console.log(`${userName} ${id} disconnected`)

    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit('server message', `- ${userName} ${id} disconnected -`)
    }

  })

})
