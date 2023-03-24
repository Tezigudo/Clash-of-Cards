const Stage = require('../models/Stage');
const GameService = require('../services/GameService');

class GameController {

    constructor() {
        this.gameService = new GameService();
    }
    async CreateRoom(req, res) {

        const name = req.body.name
        const player1_id = req.body.player1_id
        const newRoom = await this.gameService.createGameRoom(name, player1_id);

        return newRoom

    }

    async JoinRoom(req, res) {
        // to be implemented
    }
}

module.exports = GameController;
