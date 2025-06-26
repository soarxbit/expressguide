const express = require('express')
const http = require('http')
const socketio = require("socket.io")
const app = express()
require('dotenv').config()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const server = http.createServer(app)
const formatMessage = require("./utils/messages");
const {userJoin, getCurrentUser} = require("./utils/activeusers");
const io = socketio(server)


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.set("view engine","ejs")

io.on("connection", socket =>{
    socket.on('joinRoom',({username, room})=>{
        console.log(socket.id, username, room)
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message',formatMessage('UCODEMY', user.username + " Has Joined!"))
        socket.broadcast.to(user.room).emit('message',formatMessage(user.username, user.username + 'has joined the room!'))
    })
})
app.get("/",(req, res)=>{
    res.render("home/landingpage")
})
app.post("/",(req, res)=>{
    const {email, password, room}=req.body
    console.log(email, password, room)
    res.render("home/chat",{email, room})
})

const PORT = process.env.PORT || 3000
server.listen(PORT, ()=>{
    console.log("Server started....")
})