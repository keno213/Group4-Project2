const router = require('express').Router();
const { User } = require('../models');

// GET all users
// /users/
router.get('/', async (req, res) => {
  console.log("GET /users/ route hit");
  const allUsers = await User.findAll();
});

modules.export = router;
