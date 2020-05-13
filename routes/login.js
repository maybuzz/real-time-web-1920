const querystring   = require('querystring')

require('dotenv').config()

function login (req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: 'user-read-private user-read-email user-top-read user-read-currently-playing user-read-recently-played user-read-playback-state user-modify-playback-state',
      redirect_uri: process.env.REDIRECT_URI
    }))
}

module.exports = login
