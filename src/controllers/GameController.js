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

    async ListAllRooms(req, res) {
        return await this.gameService.getAllRooms();
    }

    async JoinRoom(req, res) {
        const roomId = req.body.roomId;
        const player_id = req.body.player_id;
        
    }

}

module.exports = GameController;
