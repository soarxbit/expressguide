const express = require('express')
const http = require('http')
const socketio = require("socket.io")
const app = express()
require('dotenv').config()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const server = http.createServer(app)
const io = socketio(server)


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.set("view engine","ejs")



io.on("connection", socket =>{
    console.log("first")
    socket.on('joinRoom',({user, room})=>{
        socket.emit('message',{user,room})
    })


})
app.get("/",(req, res)=>{
    res.render("home/landingpage")
})
app.get("/chat",(req, res)=>{
    res.render("home/chat")
})


const PORT = process.env.PORT || 3000
server.listen(PORT, ()=>{
    console.log("Server started....")
})