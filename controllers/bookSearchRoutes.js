const router = require("express").Router();
const { Review } = require("../models");
const { withGuard } = require("../utils/authGuard");

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
      reviews,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new", withGuard, (req, res) => {
  res.render("newReview", {
    dashboard: true,
    loggedIn: req.session.logged_in,
  });
});

router.get("/edit/:id", withGuard, async (req, res) => {
  try {
    const reviewData = await Review.findByPk(req.params.id);

    if (reviewData) {
      const post = reviewData.get({ plain: true });

      res.render("editReview", {
        dashboard: true,
        review,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// this is not using withGuard or apiGuard
router.post("/", async (req, res) => {
  try {
    const books = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        req.body.searchterm +
        "&maxResults=10"
    );
    const bookdata = await books.json();

    res.json(bookdata.items);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
