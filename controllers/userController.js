const router = require(`express`).Router();
const { User } = require('../models');

// GET all users
// /users/

router.get('/', async (req, res) => {
    const allUsers = await User.findAll();
});

module.exports = router;

// will need a login route logout and sign up route
