const express = require('express');
const GameController = require('../controllers/GameController');

function GameRouter(io) {
    const router = express.Router();
    const gameController = new GameController();

    router.post('/createRoom', async (req, res) => {

        try { room = await gameController.CreateRoom(req, res); }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: "$Error creating room", error: err });
            return
        }


        res.payload = room;
        res.json({ message: `Room ID: ${room.roomId} has been created` }).status(200);
        io.emit('roomCreated', room);

    });

    router.get('/roomList', async (req, res) => {
        const all_room = await gameController.ListAllRooms(req, res)
        res.json(all_room)
    });

    return router;
}


module.exports = GameRouter;