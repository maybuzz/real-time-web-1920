console.log("oauth");

const express       = require('express')
const request       = require('request')
const querystring   = require('querystring')
const router        = express.Router()

require('dotenv').config()

let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://get-a-recordroom.heroku.com/'

router
  .get('/login', oauthLogin)
  .get('/callback', callback)

function oauthLogin (req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: 'user-read-private user-read-email user-top-read user-read-currently-playing user-read-recently-played user-read-playback-state user-modify-playback-state',
      redirect_uri
    }))
}

function callback (req, res) {
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
    let uri = process.env.FRONTEND_URI || 'http://get-a-recordroom.heroku.com/'
    req.session.access_token = access_token
    res.redirect(uri)
    console.log(access_token);
  })
}

module.exports = router
