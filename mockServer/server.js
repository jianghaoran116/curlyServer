const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path')

const Video = require('./models/video')
const User = require('./models/User')

//連接mongo并使用curly这个集合
const DB_URL = "mongodb://localhost:27017/"
mongoose.connect(DB_URL+"curly", { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('mongodb Connection success!')
    }
})

// app.use('/bundle', express.static(path.join(__dirname, '../bundle')))
// app.use('/static', express.static(path.join(__dirname, '../static')))

// app.set('view engine', 'ejs');
// app.engine('html', ejs.renderFile);

app.set('port', 9093);

app.get('/', function (req, res) {
    // Video.fetch(function (err, video) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(video)
    //         res.render('../index.ejs', {
    //             video: video
    //         })
    //     }
    // })
})

app.get('/data', function(req, res) {
    User.find({}, function(err, doc) {
        res.json(doc)
    })
})

app.use(function (req, res, next) {
    res.status(404);
    res.send('404 - Not Found')
})

app.listen(app.get('port'), function () {
    console.log('express started on port 9093')
})