// const router = require('express').Router();
// const CatchError = require('../handlers/errorhandler');
// const gameController = require('../controllers/gameController');

// const auth = require('../middleware/auth').verifyToken;

// router.post("/", auth, CatchError(GameController.createGameroom));


// module.exports = router;

const express = require('express');
const GameController = require('../controllers/GameController');
const CatchError = require('../handlers/errorhandler');

function GameRouter(io) {
    const router = express.Router();
    const gameController = new GameController();

    router.post('/createRoom', async (req, res) => {

        try { room = await gameController.CreateRoom(req, res); }
        catch (err) {
            console.error(err);
            res.json({ message: "$Error creating room", error: err }).status(500);
            return
        }

        // io.emit('createGame', req.body);
        io.emit('createGameRoom', room);

        res.json({ message: `Room ID: ${room.roomId} has been created` }).status(200);

        res.payload = room;
        res.redirect(`/${room.roomId}`);
    });

    return router;
}


module.exports = GameRouter;