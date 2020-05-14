console.log("routes")

const { app }       = require('../server')

const index         = require('./index')
const login         = require('./login')
const home          = require('./home')
const room          = require('./room')

// pre-coded rooms
const { getRoom1 }  = require('./rooms')
const { getRoom2 }  = require('./rooms')
const { getRoom3 }  = require('./rooms')

const search        = require('./search')

// oauth middleware
const callback      = require('../modules/callback')

app.get('/', index)
app.get('/login', login)
app.get('/home', home)

// oauth middleware
app.get('/callback', callback)

// detail pages (album)
app.get('/room/:id', room)

// pre-coded rooms (albums)
app.get('/room1', getRoom1)
app.get('/room2', getRoom2)
app.get('/room3', getRoom3)

// search request
app.post('/', search)
