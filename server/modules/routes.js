console.log("routes")

const express   = require('express')
const router    = express.Router()
const {getDataWithToken} = require('./helper')
const {oauthLogin} = require('./oauth')

router.get('/', index)
router.get('/login', login)
router.get('/add-room', addRoom)
router.get('/room', room)
router.post('/', searchAlbum)

async function index(req,res){
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://localhost:3000/login'

  const config_me = {
            url: `https://api.spotify.com/v1/me/player/currently-playing`,
            access_token
        }

  const me = await getDataWithToken(config_me)

  console.log("token", access_token)
  console.log("data me", me.item.album.images);

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('index', {
      me_pic: me.item.album.images,
      search: []
    })
  }
}

function login(req,res){
  res.render('login')
}

function addRoom(req, res){
  res.render('add-room')
}

function room(req, res){
  res.render('room')
}

async function searchAlbum(req, res){
  let searchVal = req.body.search
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

  const data = await getDataWithToken(config_search)

  console.log("data", data.albums.items)
  console.log("data l", data.albums.items.length)

  res.render('index', {
    search: data.albums.items
  })
}

module.exports = router
