const router = require('express').Router();
const CatchError = require('../handlers/errorhandler');
const gameController = require('../controllers/gameController');

const auth = require('../middleware/auth').verifyToken;

router.post("/", auth, CatchError(GameController.createGameroom));


module.exports = router;
