<<<<<<< HEAD
const router = require(`express`).Router();
const { User } = require('../models');

// GET all users
// /users/

router.get('/', async (req, res) => {
=======
const router = require ('express').Router();
const { User } = require('../models');


// Get all users
router.get('/', async (req, res) => {
    console.log("GET /users/ route hit");
>>>>>>> 30710ba76913d2b5fb999a2d3ebc94e99883d519
    const allUsers = await User.findAll();
});

module.exports = router;

<<<<<<< HEAD
// will need a login route logout and sign up route
=======

// Get a single user by ID


// Create a new user


// Update a user by ID


// Delete a user by ID


// User login

// User logout
>>>>>>> 30710ba76913d2b5fb999a2d3ebc94e99883d519
