const router = require('express').Router();
const { Book } = require('../../models');


//Fetch all books
//not http://Localhost:3001
// http://Localhost:3001/books
router.get('/', async (req, res) => {
// const allBooks = await books.findAll();
    res.send("book");
});

module.exports = router;

