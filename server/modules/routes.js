console.log("routes")

const express   = require('express')
const fetch = require('node-fetch')
const router    = express.Router()
const {getDataWithToken} = require('./helper')
const {oauthLogin} = require('./oauth')

router.get('/', index)
router.get('/login', login)
router.get('/room', room)
router.get('/room/#:id', getRoom)
router.post('/', searchAlbum)

async function index(req,res){
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://localhost:3000/login'

  const config_recent = {
            url: `https://api.spotify.com/v1/me/player/recently-played`,
            access_token
        }

  const recent = await getDataWithToken(config_recent)

  console.log("token", access_token)

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('index', {
      recent: recent,
      search: []
    })
  }

}

function login(req,res){
  res.render('login')
}

async function room(req, res){
  let searchVal = req.session.searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://localhost:3000/login'

  const config_recent = {
            url: `https://api.spotify.com/v1/me/player/recently-played`,
            access_token
        }

  const recent = await getDataWithToken(config_recent)

  console.log(searchVal);
  console.log("params", req.params);

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('room', {
      recent: recent,
    })
  }

}

async function getRoom(req, res) {
  let searchVal = req.session.searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://localhost:3000/login'

  const config_recent = {
            url: `https://api.spotify.com/v1/me/player/recently-played`,
            access_token
        }

  const recent = await getDataWithToken(config_recent)

  console.log(searchVal);
  console.log("params", req.params);

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('room', {
      recent: recent,
    })
  }
}

async function searchAlbum(req, res){
  let searchVal = req.body.search
  req.session.searchVal = searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://localhost:3000/login'

  console.log("token", access_token)
  console.log("search", searchVal)

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  }

  const config_search = {
            url: `https://api.spotify.com/v1/search?q=${searchVal}&type=album&limit=10&offset=0`,
            access_token
        }

  const config_recent = {
            url: `https://api.spotify.com/v1/me/player/recently-played`,
            access_token
        }

  const recent = await getDataWithToken(config_recent)
  const data = await getDataWithToken(config_search)

  console.log("data", data.albums.items)

  res.render('index', {
    recent: recent,
    search: data.albums.items
  })
}

module.exports = router
