"use strict"

const http = require('http');
const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');

const setStatus = require("./src/utils/PlayerUtils").setStatus;
const app = require('./src/app');

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST", "PUT"]
    }
});

io.use(socketioJwt.authorize({
    secret: process.env.SECRET,
    handshake: true,
    jwt: true,
    auth_header_required: true
}))

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

io.on('connection', (socket) => {
    const userId = socket.decoded_token.id;
    console.log(`User connected: ${userId}`);

    // setplayer status to online
    setStatus(userId, "Online")

    // console.log('handshake: ', socket.handshake.auth)

    socket.on('disconnect', () => {
        console.log("User disconnected");
        // setplayer status to Offline
        setStatus(userId, "Offline")
    })

    socket.onAny((event, ...args) => {
        "?"
        console.log(event, args)
    })

    socket.on("test", (playerName) => {
        io.emit("test", playerName)
    })

    socket.on("createGame", (game) => { });
});

module.exports = {
    io: io
}
