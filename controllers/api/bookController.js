const router = require('express').Router();
const { Book } = require('../../models');


// //Fetch all books
// //not http://Localhost:3001
// // http://Localhost:3001/books
router.post('/searchgoogle', async (req, res) => {
try {
   const books = await fetch("https://www.googleapis.com/books/v1/volumes?q="+req.body.searchterm);
   const bookdata = await books.json()
  
   res.json(bookdata.items) 
} catch (error) {
    res.json(error)
}
});

module.exports = router;

