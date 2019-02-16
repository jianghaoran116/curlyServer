const mongoose = require('mongoose')

const UserSchema = require('../schemas/user.js')
const User = mongoose.model('User', UserSchema)

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

// User.remove({age: 18}, function(err, doc) {
//     console.log(doc)
// })

module.exports = User;