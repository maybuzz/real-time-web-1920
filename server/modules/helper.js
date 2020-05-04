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

function getProfileData({access_token, url}){
  fetch(url, {
      headers:
      {
      'Authorization': 'Bearer ' + access_token
      }
  }).then(async response => {
    const me = await response.json()
  })
}

function getAlbum({access_token, searchVal}){
  fetch(`https://api.spotify.com/v1/search?q=${searchVal}&type=album&limit=10&offset=0`, {
      headers:
      {
      'Authorization': 'Bearer ' + access_token
      }
  }).then(async response => {
    const search = await response.json()
  })
}

module.exports = {getDataWithToken, getProfileData, getAlbum}
