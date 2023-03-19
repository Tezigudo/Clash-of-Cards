require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express(); // Create an express app

const server = require('http').createServer(app); // Create a server
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
}); // Create a socket.io server
const socketioJwt = require('socketio-jwt'); // Import socketio-jwt
const loginRequired = require('./src/middlewares/auth');

io.use(socketioJwt.authorize({
    secret: process.env.SECRET,
    handshake: true,
    auth_header_required: true
}))


const socketRouter = require('./src/routes/SocketRouter')(io); // Import the SocketRouter


app.use('/api', socketRouter); // Use the SocketRouter (api/

app.set("view engine", "ejs"); // Set the view engine to ejs
app.set('views', __dirname + '/src/views'); // Set the views folder to src/views

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log(`Connected to database ${res}`)
}).catch((err) => {
    console.log(`Error connecting to database ${err}`)
});

// Set the body parser to urlencoded (for forms and stuff)
app.use(express.urlencoded({ extended: false }));

app.use(express.json()) // Set the body parser to json

app.use('/user', require('./src/routes/UserRouter')); // Use the UserRouter (api/user/)


app.get('/', loginRequired, (req, res) => {
    res.render("index");
});

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/register', (req, res) => {
    res.render("register");
})

io.on('connection', (socket) => {
    const userId = socket.decoded_token.userId;

    console.log(`User connected: ${userId}`);
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log("User disconnected");
    })

    socket.on("test", () => { })
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
