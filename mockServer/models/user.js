const mongoose = require('mongoose')

const UserSchema = require('../schemas/user.js')
const ChatSchema = require('../schemas/chat.js')

mongoose.model('User', UserSchema)
mongoose.model('Chat', ChatSchema)

// User.create({
//     name: 'mama',
//     age: 18
// }, function(err, doc) {
//     if(!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })

// User.remove({name: 'mama'}, function(err, doc) {
//     console.log(doc)
// })

// module.exports = User;

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}