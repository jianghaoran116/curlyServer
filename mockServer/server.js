const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./models/user');
const chatModel = model.getModel('Chat');
const userRouter = require('./user');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//連接mongo并使用curly这个集合
const DB_URL = "mongodb://localhost:27017/"
mongoose.connect(DB_URL+"curly", { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('mongodb Connection success!')
    }
})

io.on('connection',function(socket){
	console.log('user login')
	socket.on('sendmsg',function(data){
		// console.log(data)
		const {from, to, msg} = data
		const chatid = [from,to].sort().join('_')
		chatModel.create({chatid,from,to,content:msg},function(err,doc){
			io.emit('recvmsg', Object.assign({},doc._doc))
		})
		// console.log(data)
		// io.emit('recvmsg',data)
	})
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(9093, function () {
    console.log('express started on port 9093')
})