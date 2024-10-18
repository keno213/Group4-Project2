const router = require('express').Router();
const { User, Book } = require('../../models');
require('dotenv').config();

// //Fetch all books
// //not http://Localhost:3001
// // http://Localhost:3001/books
router.post('/searchgoogle', async (req, res) => {
    try {
        const books = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + req.body.searchterm + "&maxResults=10");
        const bookdata = await books.json()

        res.json(bookdata.items)
    } catch (error) {
        res.json(error)
    }
});

// ADD a post route for adding a book id to the user model
router.post('/addbook', async (req, res) => {
    try {
        await User.update(
            { book_ids: [req.body.book_id] },
            {
                where: {
                    id: req.session.user_id
                }
            }
        )

        res.json({
            message: "Success"
        })

    } catch (error) {
        res.json(error)
    }
});

module.exports = router;

