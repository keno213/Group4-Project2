<<<<<<< HEAD
// controllers/index.js 
const router = require(`express`).Router();

// Example route
router.get('/test', (req, res) => {
    res.json({ message: 'Controller is working!' });
});

const bookController = require('./bookController');
const userController = require('./userController');
const libraryController = require('./libraryController');
const reviewController = require('./reviewController');

router.use('/books', bookController.getAllBooks);
router.use('/users', userController.getAllUsers);
router.use('/libraries', libraryController.getAllLibraries);
router.use('/reviews', reviewController.getAllReviews);
=======
const router = require('express').Router();
//const userRoutes = require('./userRoutes');
//const reviewRoutes = require('./reviewRoutes');
router.get('/', (req, res) => { res.send('Hello World!') });


const bookController = require('./bookController');

router.use('/books', bookController);


const reviewController = require('./reviewController');

router.use('/reviews', reviewController);


const userController = require('./userController');

router.use('/users', userController);
>>>>>>> 30710ba76913d2b5fb999a2d3ebc94e99883d519

module.exports = router;