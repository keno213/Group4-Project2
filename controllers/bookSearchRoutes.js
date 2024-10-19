const router = require("express").Router();
const { Review } = require("../models");
const { withGuard } = require("../utils/authGuard");

// get /bookSearch
// this route gets all the reviews
router.get("/", withGuard, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.render("book", {
      dashboard: true,
      loggedIn: req.session.logged_in,
      reviews,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get /bookSearch/newReview
router.get("/newReview", withGuard, (req, res) => {
  res.render("newReview", {
    dashboard: true,
    loggedIn: req.session.logged_in,
  });
});
// get /bookSearch/editReview/:id
router.get("/edit/:id", withGuard, async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id);

    if (reviewData) {
      const review = reviewData.get({ plain: true });

      res.render("editReview", {
        dashboard: true,
        loggedIn: req.session.logged_in,
        review,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// post /bookSearch
// front end sends the data to this route and the results are sent back to the front end;
//took out withGuard
router.post("/", async (req, res) => {
  try {
    const books = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        req.body.searchterm +
        "&maxResults=5"
    );
    const bookdata = await books.json();

    res.json(bookdata.items);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
