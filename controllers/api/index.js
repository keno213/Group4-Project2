const router = require('express').Router();
const bookController = require('./bookController');
const userController = require('./userController');

router.use('/books', bookController);
router.use('/users', userController);

module.exports = router;