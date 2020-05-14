console.log("callback")

const express       = require('express')
const request       = require('request')

require('dotenv').config()

function callback (req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
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

    res.cookie('access_token', body.access_token)

    res.redirect(uri)
  })
}

module.exports = callback
