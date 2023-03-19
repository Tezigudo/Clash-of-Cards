const router = require('express').Router();
const CatchError = require('../handlers/errorhandler');
const UserController = require('../controllers/UserController');

router.post("/login", UserController.login);
router.post("/register", UserController.register);

module.exports = router;