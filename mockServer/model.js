const mongoose = require('mongoose')
//連接mongo并使用curly这个集合
const DB_URL = "mongodb://localhost:27017/"
mongoose.connect(DB_URL+"curly", { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('mongodb Connection success!')
    }
})