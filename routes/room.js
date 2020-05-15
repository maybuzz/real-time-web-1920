const { getDataWithToken } = require('../modules/helper')

async function room(req, res) {
  const albumId = req.params.id
  req.cookies.albumId = albumId
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

  // console.log('album', album);

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
      tracks: tracks.items
    })
  }
}

module.exports = room
