const jwt = require('jwt-then')
const Player = require('../models/Player')


async function getPlayerFromId(id){
    const player = await Player.findById(id)
    return player
}

module.exports = getPlayerFromId