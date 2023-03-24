// const router = require('express').Router();
// const CatchError = require('../handlers/errorhandler');
// const gameController = require('../controllers/gameController');

// const auth = require('../middleware/auth').verifyToken;

// router.post("/", auth, CatchError(GameController.createGameroom));


// module.exports = router;

const express = require('express');
const GameController = require('../controllers/GameController');

function GameRouter(io) {
    const router = express.Router();
    const gameController = new GameController();

    router.post('/createRoom', async (req, res) => {


        room = await gameController.CreateRoom(req, res);

        // io.emit('createGame', req.body);
        io.emit('createGame', room);
        res.json({ message: `Room ID: ${room.roomId} has been created` }).status(200);
    });

    return router;
}


module.exports = GameRouter;