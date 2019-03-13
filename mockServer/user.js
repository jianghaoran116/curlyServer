const express = require('express')
const utils = require('utility')
const userModel = require('./models/user')

const Router = express.Router();

function md5pwd(pwd) {
  let salt = "curly@#@=.=~~~!SPA~~~"
  return utils.md5(utils.md5(pwd+salt))
}

Router.get('/list', function(req, res){
  // userModel.remove({}, function(e, d) {})
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
      userModel.create({user, pwd: md5pwd(pwd), type}, function(e, d) {
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

Router.post('/login', function(req, res){
  const {user, pwd} = req.body;
  userModel.findOne({user, pwd: md5pwd(pwd)}, {pwd: 0}, function(err, doc) {
    if(!doc) {
      return res.json({
        code: 1,
        msg: '用户名或密码错误'
      })
    } else {
      return res.json({
        code: 0,
        data: doc
      })
    }
  })
})

Router.get('/info', function(req, res){
  return res.json({code: 1})
})

module.exports = Router