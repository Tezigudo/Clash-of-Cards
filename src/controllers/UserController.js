const Player = require('../models/Player');
const sha256 = require('js-sha256').sha256;
const jwt = require('jwt-then');




async function register(req, res) {
    const { name, email, password } = req.body;


    const emailRegex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]/

    if (!emailRegex.test(email)) {
        throw "Email is not supported from your domain";
    }

    if (password.length < 6) {
        throw "Password must be at least 6 characters long";
    }

    const playerExists = await Player.findOne({
        email
    });

    if (playerExists) {
        throw "Player with same email already exists";
    }

    const player = new Player({
        name: name,
        email: email,
        password: sha256(password + process.env.SALT)
    })

    await player.save();

    res.json({
        message: `Player ${name} registered successfully`
    })
}

async function login(req, res) {

    const { email, password } = req.body;
    const player = await Player.findOne({
        email,
        password: sha256(password + process.env.SALT)
    })

    if (!player) {
        throw "Email and Password didnt match";
    }

    const token = await jwt.sign({ id: player.id }, process.env.SECRET)

    res.json({
        messagse: "Login successful",
        token
    })

}

module.exports = {
    register,
    login
}