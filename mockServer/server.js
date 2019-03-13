const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const utils = require('utility')

const userRouter = require('./user');
const app = express();

//連接mongo并使用curly这个集合
const DB_URL = "mongodb://localhost:27017/"
mongoose.connect(DB_URL+"curly", { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('mongodb Connection success!')
    }
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

app.listen(9093, function () {
    console.log('express started on port 9093')
})