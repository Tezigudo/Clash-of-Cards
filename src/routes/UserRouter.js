const express = require('express')
const CatchError = require('../handlers/errorhandler');
const { register, login, logout } = require('../controllers/UserController');
const PlayerController = require('../controllers/PlayerController');

function UserRouter(io) {
    /**
 * @api {post} /api/user/register Register a new user
 * @apiName Register
 * @apiGroup User
 * 
 * @apiBody {String} name Username of the user
 * @apiBody {String} email Email of the user
 * @apiBody {String} password Password of the user
 * 
 * @apiSuccess {String} message Message of the response
 * 
 * @apiError {String} message Error message
 */

    const router = express.Router();
    const playerController = new PlayerController();


    router.post("/register", CatchError(register));

    router.post("/login", CatchError(login));
    router.get("/logout", CatchError(logout));

    router.put("/setstatus/:player_id", (req, res) => playerController.setStatus(req, res));

    return router;


}

module.exports = UserRouter;
