"use strict";

require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./src/app');


const server = require('http').createServer(app); // Create a server
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
}); // Create a socket.io server
const socketioJwt = require('socketio-jwt'); // Import socketio-jwt


io.use(socketioJwt.authorize({
    secret: process.env.SECRET,
    handshake: true,
    jwt: true,
    auth_header_required: true
}))


const socketRouter = require('./src/routes/SocketRouter')(io); // Import the SocketRouter



app.use('/api', socketRouter); // Use the SocketRouter (api/

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log(`Connected to database ${res}`)
}).catch((err) => {
    console.log(`Error connecting to database ${err}`)
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// socket.io stuff
io.on('connection', (socket) => {
    const userId = socket.decoded_token.userId;
    console.log(`User connected: ${userId}`);

    // console.log('handshake: ', socket.handshake.auth)

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

    socket.onAny((event, ...args) => {
        console.log(event, args)
    })

    socket.on("test", (playerName) => {
        io.emit("test", playerName)
    })
});


