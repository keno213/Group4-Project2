const router = require("express").Router();
const { Book, Favorite, Review, User } = require("../models");
const bcrypt = require("bcrypt");
// get /signup
router.get("/signup", (req, res) => {
  res.render("signup");
});
// post /signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    req.session.userId = user.id;
    console.log("User signed up and created successfully!");
    res.render("search");
  } catch (err) {
    console.error(err);
    res.render("signup");
  }
});
// get /login
router.get("/login", (req, res) => {
  res.render("login");
});
// post /login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user.id;
      res.render("search");
    } else {
      console.log("username or pssword was incorrect");
      res.render("login");
    }
  } catch (err) {
    console.error(err);
    res.render("login");
  }
});
// get /logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.render("index");
  });
});
// get /
router.get("/", (req, res) => {
  res.render("index");
});
// get /search - just gets the last 5 searched books from the database
// this gets what is already saved to the database
// the database model is a different structure compared to the api.
router.get("/search", async (req, res) => {
  try {
    console.log("GET /search route was hit");

    // Get the search query from the query parameters or use a default
    const searchQuery = req.query.q || "javascript";

    // Fetch data from Google Books API
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        searchQuery
      )}&maxResults=5}`
    ); // Fetch the first 5 books
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const books = response.json();
    res.render("search", { books });
  } catch (error) {
    console.error(error);
    res;
    console.error(error);
    res.render("search", { books: [] }); // Render with empty books array on error
  }
});
// post /search
// router.post("/search", async (req, res) => {
//   console.log("/SEARCH route was hit: ");
//   // get the search query from the front end and search the google books api for books and return them to the front end
//   const query = req.body.searchQuery;
//   // console.log("SEARCH QUERY: ", query);
//   try {
//     const booksData = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
//     );
//     const books = await booksData.json();
//     // save the books to the database
//     console.log("API BOOKS: ", books);
//     books.items.forEach(async (book) => {
//       await Book.create({
//         googleId: book.id,
//         title: book.volumeInfo.title,
//         author: book.volumeInfo.authors[0],
//         description: book.volumeInfo.description,
//         image: book.volumeInfo.imageLinks.thumbnail,
//         url: book.volumeInfo.previewLink,
//         userId: req.session.userId,
//       });
//     });
//     console.log("BOOKS saved to the database");

//     console.log("RETCHED BOOKS RESULTS: ", books);
//     res.render("search", { books });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while searching for books.");
//   }
// });
// get /favorites
router.get("/favorites", async (req, res) => {
  try {
    // const favoritesData = await sequelize.query(
    //   "SELECT book.*, favorite.* FROM book, favorite WHERE book.'userId' = book.'favoriteId' AND favorite.'bookId' = book.'id' AND favorite = TRUE"
    // );
    const favoritesData = await Book.findAll({
      where: { userId: req.session.userId },
    });
    const favorites = favoritesData.map((favorite) =>
      favorite.get({ plain: true })
    );
    console.log("QUERY: ", favorites);
    res.render("favorites", { favorites });
    //this worked before
    // res.render("favorites");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while finding favorites.");
  }
});
// post /favorite
router.post("/favorites", async (req, res) => {
  try {
    const { bookId, title } = req.body;
    await Favorite.create({ bookId, title, userId: req.session.userId });

    // get favorites from database
    const favorites = await Favorite.findAll({
      where: { userId: req.session.userId },
    });
    res.render("favorites", { favorites });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while favoriting a book.");
  }
});
// get /reviews
router.get("/reviews", async (req, res) => {
  // in order to show a review I need the book and the review from the database
  try {
    const reviewsData = await Review.findAll({
      where: { userId: req.session.userId },
    });
    const reviews = reviewsData.map((review) => review.get({ plain: true }));
    res.render("reviews", { reviews });
    // res.render("reviews");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while getting reviews from the database.");
  }
});
// post /review
router.post("/reviews", async (req, res) => {
  try {
    const { bookId, reviewText } = req.body;
    await Review.create({ bookId, reviewText, userId: req.session.userId });
    //get the review
    const reviews = await Review.findAll({
      where: { userId: req.session.userId },
    });
    res.render("reviews", { reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while reviewing a book.");
  }
});
module.exports = router;
