const express = require('express'); // Import express
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { loginRequired, logoutRequired, verifyToken } = require('./middlewares/auth');


const app = express(); // Create an express app


app.use(cookieParser())
app.use(cors({
    origin: "*",
}))

app.set("view engine", "ejs"); // Set the view engine to ejs
app.set('views', __dirname + '/views'); // Set the views folder to src/views

// Set the body parser to urlencoded (for forms and stuff)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // Set the body parser to json


app.use('/user', require('./routes/UserRouter')); // Use the UserRouter (api/user/)

// Render the index page
app.get('/', loginRequired, verifyToken, (req, res) => {
    res.locals.token = req.cookies.token;
    res.render("index", { name: req.payload.name, id: req.payload.id });
});

// Render the login page
app.get('/login', logoutRequired, (req, res) => {
    res.render("login", { message: "" });
})

// Render the register page
app.get('/register', (req, res) => {
    res.render("register");
})



module.exports = app;