console.log("oauth");

const express       = require('express')
const request       = require('request')
const querystring   = require('querystring')
const router        = express.Router()

require('dotenv').config()

let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:3000/'

// let redirect_uri =
//   process.env.REDIRECT_URI ||
//   'https://linernotez.herokuapp.com/spotify/callback'

router.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: 'user-read-private user-read-email user-top-read user-read-currently-playing user-read-recently-played user-read-playback-state',
      redirect_uri
    }))
})

router.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(
        process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/'
    req.session.access_token = access_token
    res.redirect(uri)
    console.log(access_token);
  })
})

module.exports = router
