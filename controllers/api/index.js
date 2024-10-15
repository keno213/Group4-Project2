const router = require('express').Router();

const userController = require('./userController');

router.use('/users', userController);

module.exports = router;