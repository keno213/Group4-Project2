const router = require("express").Router();
const { Book } = require('../models');

// Fetch all book 
router.get('/', async (req, res) => {
 const allBooks = await Book.findAll();
});

module.exports = router;
