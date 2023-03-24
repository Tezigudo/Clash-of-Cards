"use strict"

const http = require('http');
const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');

const app = require('./src/app');

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
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
    const userId = socket.decoded_token.userId;
    console.log(`User connected: ${userId}`);

    // console.log('handshake: ', socket.handshake.auth)

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

    socket.onAny((event, ...args) => {"?"
        console.log(event, args)
    })

    socket.on("test", (playerName) => {
        io.emit("test", playerName)
    })

    socket.on("createGame", (game) => {});
});

module.exports = {
    io: io
}
