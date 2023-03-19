const router = require('express').Router();
const CatchError = require('../handlers/errorhandler');
const UserController = require('../controllers/UserController');

router.post("/login", CatchError(UserController.login));
router.post("/register", CatchError(UserController.register));

module.exports = router;