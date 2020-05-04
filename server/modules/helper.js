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


module.exports = {getDataWithToken}
