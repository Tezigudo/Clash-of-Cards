const Player = require('../models/Player')


class PlayerService {
    async setStatus(player_id, status) {
        const player = await Player.findById(player_id)
        if(!player){
            throw `Player with id ${player_id} does not exist`
        }

        player.setStatus(status)
    }
}

module.exports = PlayerService;