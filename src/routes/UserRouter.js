const express = require('express')
const CatchError = require('../handlers/errorhandler');
const { register, login, logout } = require('../controllers/UserController');
const PlayerController = require('../controllers/PlayerController');

function UserRouter(io) {

    const router = express.Router();
    const playerController = new PlayerController();

    router.post("/register", CatchError(register));
    router.post("/login", CatchError(login));
    router.get("/logout", CatchError(logout));

    router.put("/setstatus/:player_id", (req, res)=>playerController.setStatus(req, res));

    return router;


}

module.exports = UserRouter;
