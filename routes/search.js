const {getDataWithToken} = require('../modules/helper')

async function search(req, res){
  let searchVal = req.body.search
  req.cookies.searchVal = searchVal
  let access_token = req.cookies.access_token
  let loginUri = process.env.LOGIN_URI || 'http://get-a-recordroom.herokuapp.com/login'

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

module.exports = search
