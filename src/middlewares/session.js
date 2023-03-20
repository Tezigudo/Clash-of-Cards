const session = require('express-session')

const SessionMiddleware = session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,

})

module.exports = SessionMiddleware