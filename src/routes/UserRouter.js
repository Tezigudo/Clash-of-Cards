const router = require('express').Router();
const CatchError = require('../handlers/errorhandler');
const UserController = require('../controllers/UserController');

router.post("/register", CatchError(UserController.register));
router.post("/login", CatchError(UserController.login));
router.get("/logout", CatchError(UserController.logout));

module.exports = router;
