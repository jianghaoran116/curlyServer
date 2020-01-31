const express = require('express')
const utils = require('utility')
const model = require('./models/user')
const userModel = model.getModel('User')
const chatModel = model.getModel('Chat')

const Router = express.Router();

const _filter = {pwd: 0, __v: 0}

function md5pwd(pwd) {
  let salt = "curly@#@=.=~~~!SPA~~~"
  return utils.md5(utils.md5(pwd+salt))
}

Router.get('/list', function(req, res){
  // userModel.remove({}, function(e, d) {})
  const { type } = req.query
	// User.remove({},function(e,d){})
	userModel.find({type},function(err,doc){
		return res.json({code:0,data:doc})
	})
  // userModel.find({}, function(err, doc) {
  //   return res.json(doc)
  // })
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

      const User = new userModel({user, pwd: md5pwd(pwd), type})

      User.save(function(e, d) {   
        if(e) {
          return res.json({
            code: 1,
            msg: '未知错误'
          })
        } else {
          const {userid, type, _id} = d
          res.cookie('userid', _id)
          return res.json({
            code: 0,
            data: {userid, type, _id} 
          })
        }
      })

      // userModel.create({user, pwd: md5pwd(pwd), type}, function(e, d) {
      //   if(e) {
      //     return res.json({
      //       code: 1,
      //       msg: '未知错误'
      //     })
      //   } else {
      //     return res.json({
      //       code: 0
      //     })
      //   }
      // })
    }
  })
})

Router.post('/login', function(req, res){
  const {user, pwd} = req.body;
  userModel.findOne({user, pwd: md5pwd(pwd)}, _filter, function(err, doc) {
    if(!doc) {
      return res.json({
        code: 1,
        msg: '用户名或密码错误'
      })
    } else {
      res.cookie('userid', doc._id)
      return res.json({
        code: 0,
        data: doc
      })
    }
  })
})

Router.get('/info', function(req, res){
  const {userid} = req.cookies;
  if(!userid) {
    return res.json({code: 1})
  }

  userModel.findOne({_id: userid}, _filter, function(e,d) {
    if(e) {
      return res.json({code: 1, msg: 'not find user'})
    }
    return res.json({code: 0, data: d})
  })
})

Router.post('/update',function(req,res){
  const {userid} = req.cookies;
	if (!userid) {
		return json.dumps({code:1})
	}
	const body = req.body
	userModel.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data})
	})
})

Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid

	userModel.find({},function(e, userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name: v.user, avatar: v.avatar}
		})
		chatModel.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if (!err) {
				return res.json({code:0,msgs:doc, users:users})
			}
		})

	})
	// {'$or':[{from:user,to:user}]}

})
Router.post('/readmsg', function(req, res){
	const userid = req.cookies.userid
	const {from} = req.body
	chatModel.update(
		{from, to:userid},
		{'$set': {read: true}},
		{'multi': true},
		function(err,doc) {
		  console.log(doc)
      if (!err) {
        return res.json({code:0, num:doc.nModified})
      }
		  return res.json({code:1, msg:'修改失败'})
    }
  )
})

module.exports = Router