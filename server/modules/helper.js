console.log("helper");


const fetch = require('node-fetch')

function getDataWithToken({acces_token, url}){
    return fetch(url,
    {
        headers:
        {
        'Authorization': 'Bearer ' + acces_token
        }
    })
        .then(response=> response.json())
}
