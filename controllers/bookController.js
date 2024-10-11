const router = require("express").Router();
const { Book } = require('../models');

// Fetch all book 
// not http://localhost:3001
// http://localhost:3001/book/
router.get('/', async (req, res) => {
  //  const allBooks = await Book.findAll();
  res.send("book")
});

module.exports = router;
