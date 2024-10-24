const router = require('express').Router();

const userController = require('./userController');
const bookController = require('./bookController');

router.use('/users', userController); // This endpoint starts with /api/users
router.use('/books', bookController); // This endpoint starts with /api/books
module.exports = router;