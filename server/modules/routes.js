console.log("routes")

const express   = require('express')
const router    = express.Router()
const {getDataWithToken} = require('./helper')

router.get('/', index)
router.get('/login', login)
router.get('/room', room)

function index(req,res){
  let access_token = req.session.access_token

  if (access_token === undefined ) {
    console.log("oops, session over");
    res.render('login')
  }

  const data = []
  res.render('index')
}

function login(req,res){
  res.render('login')
}

function room(req, res){
  res.render('room')
}

module.exports = router
