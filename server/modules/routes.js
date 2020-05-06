console.log("routes")

const express   = require('express')
const fetch = require('node-fetch')
const router    = express.Router()
const {getDataWithToken} = require('./helper')
const {playAlbum} = require('./helper')

router.get('/', index)
router.get('/login', login)
router.get('/room/:id', getRoom)
router.get('/room1', getRoom1)
router.get('/room2', getRoom2)
router.get('/room3', getRoom3)
router.post('/', searchAlbum)

async function index(req,res){
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.heroku.com/login'
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

  const albumId1 = '6R1VyRo1cFv2JDC1diCkPS'
  const albumId2 = '5VsdAamB1UmApCNBwdSFiw'
  const albumId3 = '04DOnsOFx8MrXA1JpjwZLH'

  const config_album1 = {
            url: `https://api.spotify.com/v1/albums/${albumId1}`,
            access_token
        }

  const config_album2 = {
            url: `https://api.spotify.com/v1/albums/${albumId2}`,
            access_token
        }

  const config_album3 = {
            url: `https://api.spotify.com/v1/albums/${albumId3}`,
            access_token
        }

  const album1 = await getDataWithToken(config_album1)
  const album2 = await getDataWithToken(config_album2)
  const album3 = await getDataWithToken(config_album3)

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
      search: [],
      album1: album1,
      album2: album2,
      album3: album3
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
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.heroku.com/login'

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

  // const config_playAlbum = {
  //           url: `https://api.spotify.com/v1/me/player/play`,
  //           access_token,
  //           albumId
  //       }

  const recent = await getDataWithToken(config_recent)
  const album = await getDataWithToken(config_album)
  const tracks = await getDataWithToken(config_tracks)

  // const play = await playAlbum(config_playAlbum)

  // console.log("play", play);
  // console.log('tracks', tracks.items[0]);

  console.log('album', album);

  for (var i = 0; i < tracks.items.length; i++) {
    const trackUri = tracks.items[i].uri
  }

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('room', {
      recent: recent,
      album: album,
      tracks: tracks.items,
      token: access_token
    })
  }
}

async function searchAlbum(req, res){
  let searchVal = req.body.search
  req.session.searchVal = searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.heroku.com/login'

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

  const albumId1 = '6R1VyRo1cFv2JDC1diCkPS'
  const albumId2 = '5VsdAamB1UmApCNBwdSFiw'
  const albumId3 = '04DOnsOFx8MrXA1JpjwZLH'

  const config_album1 = {
            url: `https://api.spotify.com/v1/albums/${albumId1}`,
            access_token
        }

  const config_album2 = {
            url: `https://api.spotify.com/v1/albums/${albumId2}`,
            access_token
        }

  const config_album3 = {
            url: `https://api.spotify.com/v1/albums/${albumId3}`,
            access_token
        }

  const album1 = await getDataWithToken(config_album1)
  const album2 = await getDataWithToken(config_album2)
  const album3 = await getDataWithToken(config_album3)

  res.render('index', {
    recent: recent,
    search: data.albums.items,
    album1: album1,
    album2: album2,
    album3: album3
  })
}

async function getRoom1(req, res) {
  const albumId = '6R1VyRo1cFv2JDC1diCkPS'
  let searchVal = req.session.searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.heroku.com/login'

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

  const recent = await getDataWithToken(config_recent)
  const album = await getDataWithToken(config_album)
  const tracks = await getDataWithToken(config_tracks)

  console.log('album', album);

  for (var i = 0; i < tracks.items.length; i++) {
    const trackUri = tracks.items[i].uri
  }

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('room', {
      recent: recent,
      album: album,
      tracks: tracks.items,
      token: access_token
    })
  }
}

async function getRoom2(req, res) {
  const albumId = '5VsdAamB1UmApCNBwdSFiw'
  let searchVal = req.session.searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.heroku.com/login'

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

  const recent = await getDataWithToken(config_recent)
  const album = await getDataWithToken(config_album)
  const tracks = await getDataWithToken(config_tracks)

  console.log('album', album);

  for (var i = 0; i < tracks.items.length; i++) {
    const trackUri = tracks.items[i].uri
  }

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('room', {
      recent: recent,
      album: album,
      tracks: tracks.items,
      token: access_token
    })
  }
}

async function getRoom3(req, res) {
  const albumId = '04DOnsOFx8MrXA1JpjwZLH'
  let searchVal = req.session.searchVal
  let access_token = req.session.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.heroku.com/login'

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

  const recent = await getDataWithToken(config_recent)
  const album = await getDataWithToken(config_album)
  const tracks = await getDataWithToken(config_tracks)

  console.log('album', album);

  for (var i = 0; i < tracks.items.length; i++) {
    const trackUri = tracks.items[i].uri
  }

  if (access_token === undefined ) {
    console.log("oops, session over")
    res.redirect(loginUri)
  } else {
    res.render('room', {
      recent: recent,
      album: album,
      tracks: tracks.items,
      token: access_token
    })
  }
}

module.exports = router
