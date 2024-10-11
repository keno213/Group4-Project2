const router = require ('express').Router();
const { User } = require('../models');


// Get all users
router.get('/', async (req, res) => {
    console.log("GET /users/ route hit");
    const allUsers = await User.findAll();
});

module.exports = router;


// Get a single user by ID


// Create a new user


// Update a user by ID


// Delete a user by ID


// User login

// User logout
