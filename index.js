"use strict";

require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./src/app');
const server = require('./server');

const io = server.io;
const socketRouter = require('./src/routes/SocketRouter')(io); // Import the SocketRouter



app.use('/api', socketRouter); // Use the SocketRouter (api/

mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log(`Connected to database ${res}`)
}).catch((err) => {
    console.log(`Error connecting to database ${err}`)
});


//////////////
// uncomment this for listing endpoint
// var route, routes = [];

// app._router.stack.forEach(function (middleware) {
//     if (middleware.route) { // routes registered directly on the app
//         routes.push(middleware.route);
//     } else if (middleware.name === 'router') { // router middleware 
//         middleware.handle.stack.forEach(function (handler) {
//             route = handler.route;
//             route && routes.push(route);
//         });
//     }
// });

// console.log(routes)