const router = require("express").Router();
const { Book } = require("../../models");
const { withGuard, apiGuard } = require("../../utils/auth");

// this route uses the express.urlencoded({ extended: true })); setting from the server.js file to get the query
router.get("/search/:query", withGuard, async (req, res) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${req.params.query}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=5`
    );
    const data = await response.json();
    // I need to test the .status to see if the route still works.
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", apiGuard, async (req, res) => {
  try {
    const [book, created] = await Book.findOrCreate({
      where: { google_books_id: req.body.google_books_id },
      defaults: {
        title: req.body.title,
        authors: req.body.authors,
        description: req.body.description,
        image_link: req.body.image_link,
      },
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
