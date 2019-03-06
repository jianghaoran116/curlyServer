const express = require('express')
const userModel = require('./models/user')

const Router = express.Router();

Router.get('/list', function(req, res){
  userModel.find({}, function(err, doc) {
    return res.json(doc)
  })
})

Router.get('/info', function(req, res){
  return res.json({code: 1})
})

module.exports = Router