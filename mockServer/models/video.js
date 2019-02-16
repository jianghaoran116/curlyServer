var mongoose = require('mongoose')

var VideoSchema = require('../schemas/video.js')
var Video = mongoose.model('Video', VideoSchema)

module.exports = Video;