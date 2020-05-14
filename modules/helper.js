console.log("helper")

const fetch = require('node-fetch')

function getDataWithToken({access_token, url}){
    return fetch(url,
    {
        headers:
        {
        'Authorization': 'Bearer ' + access_token
        }
    })
        .then(response=> response.json())
}

function pauseAlbum(album){

  return fetch(`https://api.spotify.com/v1/me/player/pause`,
  {
    method: "PUT",
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      context_uri: album.uri
    })
  }).then((response) => response)

}


module.exports = { getDataWithToken }
