const router = require('express').Router();
const { User, Book } = require('../../models');
require('dotenv').config();

router.get("/favorites", async (req, res) => { // This is where the favorites is 
    try {
        const user = await User.findOne({
            where: {
                id: req.session.user_id
            }
        })

        // serialize the user object
        const userData = user.get({ plain: true });

        const books = userData.books;

        res.json(books)
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
})

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
router.post('/addbook', async (req, res) => { // This is where we add it to the favorites
    try {
        const user = await User.findOne({
            where: {
                id: req.session.user_id
            }
        })

        // serialize the user object
        const userData = user.get({ plain: true });

        console.log(userData)

        const new_books = [...userData.books, req.body.book];

        await User.update(
            { books: new_books },
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
        console.log(error)
        res.json({
            error
        })
    }
});

module.exports = router;

