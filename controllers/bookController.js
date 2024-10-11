const router = require('express').Router();
const { Book } = require('../models');

// GET all books
router.get('/', async (req, res) => {
  const allBooks = await book.findAll();
});
  
module.exports = router;