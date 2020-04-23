console.log("routes");

const express   = require('express')
const router    = express.Router()
const {getDataWithToken} = require('./helper')

router.get('/login', login)
router.get('/', index)

function login(req,res){
  res.render('login')
}

function index(req,res){
  const data = []
  res.render('index')
}

module.exports = router ;
