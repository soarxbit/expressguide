const socket = io()
const user='unoca'
const room= 'software'
socket.emit('joinRoom',{user,room})
socket.on('message',({user,room})=>{
    console.log(user,"-",room)
})
