const GameRoom = require('../models/GameRoom');
const Stage = require('../models/Stage');
const Player = require('../models/Player');

class GameRoomService {

    makeid() {
        let id = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 5) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return id;
    }

    async getAllRoomsIds() {
        try {
            const rooms = await GameRoom.find({}, { roomId: 1, _id: 0 });
            const roomIds = rooms.map(room => room.roomId);
            return roomIds;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createGameRoom(name, player1_id) {
        const player = await Player.findById(player1_id)

        if (!player) {
            throw `Player with id ${player1_id} does not exist`
        }
        console.log(player.status)

        if (player.status == 'waiting') {
            throw `Player with id ${player1_id} is already in a room`
        }


        const all_rooms = await this.getAllRoomsIds();
        let roomId = undefined;
        while (true) {
            roomId = this.makeid();
            if (!all_rooms.includes(roomId)) {
                break;
            }
        }

        player.setStatus('waiting'); // set player status to waiting
        console.log(player)


        return await GameRoom.create({
            roomId: roomId,
            name: name,
            players: [player1_id],
        })


    }
}

module.exports = GameRoomService;