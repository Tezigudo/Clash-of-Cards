const PlayerService = require('../services/PlayerService');

class PlayerController {

    constructor() {
        this.playerService = new PlayerService();
    }

    setStatus(req, res) {
        console.log(this.playerService)

        const player_id = req.params.player_id;
        const status = req.body.status;

        this.playerService.setStatus(player_id, status);

        res.json({
            message: `Player with id ${player_id} status set to ${status}`
        }).status(200)

    }
}


module.exports = PlayerController;
