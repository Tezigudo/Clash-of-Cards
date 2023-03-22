"use strict";

require('dotenv').config();
// const express = require('express');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const app = express(); // Create an express app
// const cors = require('cors');
// const SessionMiddleware = require('./src/middlewares/session');

const app = require('./src/app');


const server = require('http').createServer(app); // Create a server
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
}); // Create a socket.io server
const socketioJwt = require('socketio-jwt'); // Import socketio-jwt
// const { loginRequired, logoutRequired, verifyToken } = require('./src/middlewares/auth');
const Player = require('./src/models/Player');
const helmet = require('helmet');

io.use(socketioJwt.authorize({
    secret: process.env.SECRET,
    handshake: true,
    jwt: true,
    auth_header_required: true
}))


const socketRouter = require('./src/routes/SocketRouter')(io); // Import the SocketRouter

// app.use(SessionMiddleware)

// app.use(cookieParser())
// app.use(helmet())
// app.use(verifyToken)


// app.use(cors({
//     origin: "*",
// }))


app.use('/api', socketRouter); // Use the SocketRouter (api/

// app.set("view engine", "ejs"); // Set the view engine to ejs
// app.set('views', __dirname + '/src/views'); // Set the views folder to src/views

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log(`Connected to database ${res}`)
}).catch((err) => {
    console.log(`Error connecting to database ${err}`)
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// // Set the body parser to urlencoded (for forms and stuff)
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json()) // Set the body parser to json

// app.use('/user', require('./src/routes/UserRouter')); // Use the UserRouter (api/user/)

// // Render the index page
// app.get('/', loginRequired, verifyToken, (req, res) => {
//     res.locals.token = req.cookies.token;
//     res.render("index", { name: req.payload.name, id: req.payload.id });
// });

// // Render the login page
// app.get('/login', logoutRequired, (req, res) => {
//     res.render("login", { message: "" });
// })

// // Render the register page
// app.get('/register', (req, res) => {
//     res.render("register");
// })



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


