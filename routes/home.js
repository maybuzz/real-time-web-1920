const { getDataWithToken } = require('../modules/helper')

async function home(req,res){
  let access_token = req.cookies.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.herokuapp.com/login'
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

module.exports = home
