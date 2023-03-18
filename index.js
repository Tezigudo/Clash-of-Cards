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


app.get('/', (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {
    2
    console.log(socket.id);
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
