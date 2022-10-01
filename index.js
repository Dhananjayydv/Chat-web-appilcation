const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const socketio = require('socket.io')
const io = socketio(server)

app.use('/',express.static(__dirname+'/public'))
const users ={};

io.on('connection',socket=>{
    socket.on('new user joined',name=>{
        console.log(name,socket.id);
        users[socket.id] = name;
        socket.broadcast.emit('user joined',name);
    })
    socket.on('send',(args)=>{
        socket.broadcast.emit('receive',args);
    })
})

server.listen(4444,()=>{
    console.log('http://localhost:4444')
})