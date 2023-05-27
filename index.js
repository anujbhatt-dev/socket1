const express = require("express")
const app = express()
const path = require("path")
const http = require("http")
const {Server} = require("socket.io")
const port = process.env.PORT || 3000

const expressServer = http.createServer(app)

const io = new Server(expressServer)

//// basic 

// io.on("connection",(socket)=>{
//     console.log("new user connected");
//     socket.on("myEvent",(msg)=>{
//         console.log(msg);
//     })
// })

////broadcast

// io.on("connection",(socket)=>{
//     setInterval(()=>{
//         const date = new Date()
//         const time = date.getTime()
//         io.sockets.emit("myBroadcast", time)

//     },1000)
// })

//// Namespaces

let buyNsp = io.of("/buy")
buyNsp.on("connection",(socket)=>{
    socket.emit("myEvent","hello buy")
})

let sellNsp = io.of("/sell")
sellNsp.on("connection",(socket)=>{
    socket.emit("myEvent","hello sell")
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

expressServer.listen(port,()=>{
    console.log("running");
})