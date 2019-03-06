const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    desc: {
        type: String
    },
    title: {
        type: String
    },
    company: {
        type: String
    },
    money: {
        type: String
    }
})

module.exports = UserSchema