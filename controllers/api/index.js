const router = require('express').Router();

const userController = require('./userController');
const bookController = require('./bookController');

router.use('/users', userController);
router.use('/books', bookController);
module.exports = router;