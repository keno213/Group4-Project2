const express = require('express');
const router = require('express').Router();
//const userRoutes = require('./userRoutes');
//const reviewRoutes = require('./reviewRoutes');
router.get('/', (req, res) => { res.send('Hello World!') });


const bookController = require('./bookController');

router.use('/books', bookController);


const reviewController = require('./reviewControllers');

router.use('/reviews', reviewController);


const userController = require('./userController');

router.use('/users', userController);

module.exports = router;
