console.log("routes")

const express   = require('express')
const fetch = require('node-fetch')
const router    = express.Router()
const {getDataWithToken} = require('./helper')
const {playAlbum} = require('./helper')
const {oauthLogin} = require('./oauth')

router.get('/', index)
router.get('/login', login)
router.get('/room/:id', getRoom)
router.post('/', searchAlbum)

async function index(req,res){
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://localhost:3000/login'
  let cover = []

  const config_recent = {
            url: `https://api.spotify.com/v1/me/player/recently-played`,
            access_token
        }

  const config_player = {
            url: `https://api.spotify.com/v1/me/player`,
            access_token
        }

  const config_current = {
            url: `https://api.spotify.com/v1/me/player/currently-playing`,
            access_token
        }

  const recent = await getDataWithToken(config_recent)

  // try {
  //   const cover = await getDataWithToken(config_current)
  //   console.log("succes", cover.item);
  // } catch (e) {
  //   const cover = await getDataWithToken(config_recent)
  //   console.log("meh", cover);
  // }

  try {
    const player = await getDataWithToken(config_player)
  } catch (e) {
    console.log("woops", e);
    console.log("spotify moet actief zijn om de applicatie te starten");
  }

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

async function getRoom(req, res) {
  const albumId = req.params.id
  req.session.albumId = albumId
  let searchVal = req.session.searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://localhost:3000/login'

  const config_recent = {
            url: `https://api.spotify.com/v1/me/player/recently-played`,
            access_token
        }

  const config_album = {
            url: `https://api.spotify.com/v1/albums/${albumId}`,
            access_token
        }

  const config_tracks = {
            url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
            access_token
        }

  const config_playAlbum = {
            url: `https://api.spotify.com/v1/me/player/play`,
            access_token,
            albumId
        }

  const recent = await getDataWithToken(config_recent)
  const album = await getDataWithToken(config_album)
  const tracks = await getDataWithToken(config_tracks)

  const play = await playAlbum(config_playAlbum)

  console.log("play", play);
  // console.log('tracks', tracks.items[0]);

  console.log('album', album);

  for (var i = 0; i < tracks.items.length; i++) {
    const trackUri = tracks.items[i].uri
    console.log(tracks.items[i].name, trackUri);
  }

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('room', {
      recent: recent,
      album: album,
      tracks: tracks.items
    })
  }
}

async function searchAlbum(req, res){
  let searchVal = req.body.search
  req.session.searchVal = searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://localhost:3000/login'

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

  res.render('index', {
    recent: recent,
    search: data.albums.items
  })
}

module.exports = router
