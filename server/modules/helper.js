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

function playAlbum({access_token, url, albumId}){
  console.log("letsgo");
  return fetch(url,
  {
    method: "PUT",
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    body: JSON.stringify({
      context_uri: `spotify:album:` + albumId
    })
  }).then(response=> response.json())

}


module.exports = {getDataWithToken, playAlbum}
