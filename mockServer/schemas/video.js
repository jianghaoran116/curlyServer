var mongoose = require("mongoose")

var VideoSchema = new mongoose.Schema({
    name: String,
    title: String,
    year: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

//每次添加前都会调用这个方法
VideoSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

//静态方法
VideoSchema.statics = {
    fetch: function(cb) {
        return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb)
    },    
    findById: function(cb) {
        return this
        .findOne({_id: id})
        .sort('meta.updateAt')
        .exec(cb)
    }
}

module.exports = VideoSchema