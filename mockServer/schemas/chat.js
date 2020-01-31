const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema({
  'chatid': {'type':String, require: true},
  'from': {'type':String, 'require': true},
  'to': {'type':String, 'require': true},
  'read': {'type':Boolean, default: false},
  'content': {'type':String, 'require': true, 'default': ''},
  'create_time': {'type':Number, 'default': Date.now}
})

module.exports = ChatSchema