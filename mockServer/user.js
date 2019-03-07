const express = require('express')
const userModel = require('./models/user')

const Router = express.Router();

Router.get('/list', function(req, res){
  userModel.find({}, function(err, doc) {
    return res.json(doc)
  })
})

Router.post('/register', function(req, res){
  console.log(req.body)
  const {user, pwd, type} = req.body;
  userModel.findOne({user}, function(err, doc) {
    if(doc) {
      return res.json({
        code: 1,
        msg: '用户名已存在'
      })
    } else {
      userModel.create({user, pwd, type}, function(e, d) {
        if(e) {
          return res.json({
            code: 1,
            msg: '未知错误'
          })
        } else {
          return res.json({
            code: 0
          })
        }
      })
    }
  })
})

Router.get('/info', function(req, res){
  return res.json({code: 1})
})

module.exports = Router