const { Server } = require("socket.io")
const express = require("express")
const https = require("https")
const http = require("http")
const fs = require("fs")

// set up https server when SSL certificates are gotten
// const httpsServer = createServer({
//     key: fs.readFileSync(),
//     cert: fs.readFileSync()
// })

// const io = new Server(httpsServer, {})

const app = express()
const server = http.createServer(app)
const io = new Server(server)

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})

io.on("connection", (socket) => {
    console.log("User connected")
    console.log(socket.id)
})