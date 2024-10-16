// controllers/index.js

const express = require('express');
const userRoutes = require('../routes/userRoutes');
const router = express.Router();

// Basic route for testing
router.get('/', (req, res) => {
    res.send('Hello World!');
});


// Import controllers
const bookController = require('./bookController');
const reviewController = require('./reviewControllers'); 
const userController = require('./userController');

// Define routes
router.use('/books', bookController);
router.use('/reviews', reviewController);
router.use('/users', userController);

// Export the router
module.exports = router;
