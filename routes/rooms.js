const {getDataWithToken} = require('../modules/helper')

async function getRoom1(req, res) {
  const albumId = '6R1VyRo1cFv2JDC1diCkPS'
  let searchVal = req.cookies.searchVal
  let access_token = req.cookies.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.herokuapp.com/login'

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
  let searchVal = req.cookies.searchVal
  let access_token = req.cookies.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.herokuapp.com/login'

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
  let searchVal = req.cookies.searchVal
  let access_token = req.cookies.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.herokuapp.com/login'

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

module.exports = { getRoom1, getRoom2, getRoom3 }
