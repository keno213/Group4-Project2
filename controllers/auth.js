const router = require("express").Router();
const { Book, Favorite, Review, User } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
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
router.get("/search", async (req, res) => {
  try {
    console.log("GET /search route was hit");
    // get 5 books saved in the database
    const books = await Book.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
    });
    res.render("search", { books });
  } catch (error) {
    console.error(error);
    res.render("search", { books: [] }); // Render with empty books array on error
  }
});
// post /search
// Search route to handle book search
router.post("/search", async (req, res) => {
  const query = req.body.searchQuery;
  const apiUrl = `${process.env.GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(
    query
  )}&maxResults=5`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("google books data in JSON format: ", data);

    if (data.items) {
      const books = data.items.map((item) => ({
        //this is the google books id
        //this has to be called id because that is what the handlebar expects
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        infoLink: item.volumeInfo.info,
      }));
      // save api books to database include the userId
      books.forEach(async (book) => {
        await Book.create({
          googleId: book.id,
          title: book.title,
          authors: book.authors,
          description: book.description,
          thumbnail: book.thumbnail,
          infoLink: book.infoLink,
          userId: req.session.userId,
        });
      });
      res.render("home", { books, query });
    } else {
      res.render("home", { books: [], query, error: "No results found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.render("home", { books: [], query, error: "Error fetching data" });
  }
});
// get /favorites
router.get("/favorites", async (req, res) => {
  try {
    // const favoritesData = await sequelize.query(
    //   "SELECT book.*, favorite.* FROM book, favorite WHERE book.'userId' = book.'favoriteId' AND favorite.'bookId' = book.'id' AND favorite = TRUE"
    // );
    // first I must find the Book.id
    // the req.body.bookId is the google book id
    const favoritesData = await Book.findAll({
      // left model name. right user's google book id
      where: { googleId: req.body.bookId },
    });
    //serialize the sequelize returned data from the db
    const bookMatches = favoritesData.map((favorite) =>
      favorite.get({ plain: true })
    );
    const saveToFav = await Favorite.create({
      favorite: true,
      fkUserId: req.session.userId,
      // Book.id that matches the search for the gid
      fkBookId: bookMatches.id,
    });
    const favorites = await Favorite.findAll({
      where: { userId: req.session.userId },
    });

    res.render("favorites", { favorites });
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
