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

module.exports = router;