const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./user');
const app = express();

const userModel = require('./models/user')

//連接mongo并使用curly这个集合
const DB_URL = "mongodb://localhost:27017/"
mongoose.connect(DB_URL+"curly", { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('mongodb Connection success!')
    }
})

app.use('/user', userRouter)

app.listen(9093, function () {
    console.log('express started on port 9093')
})