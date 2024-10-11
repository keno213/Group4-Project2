const router = require('express').Router();
<<<<<<< HEAD
const { Book } = require('../models');
=======
const books = require(`../models`);


//Fetch all books
//not http://Localhost:3001
// http://Localhost:3001/books
router.get('/', async (req, res) => {
// const allBooks = await books.findAll();
    res.send("book");
});

module.exports = router;
>>>>>>> 30710ba76913d2b5fb999a2d3ebc94e99883d519

// GET all books
router.get('/', async (req, res) => {
  const allBooks = await book.findAll();
});
  
module.exports = router;