const router = require("express").Router();
const { Review } = require("../models");
const { withGuard } = require("../utils/authGuard");
// routes get /bookSearch, /bookSearch/addReview, /bookSearch/editReview/:id
// post / bookSearch

// get /bookSearch
// gets all the reviews for one logged in user by user_id
router.get("/", withGuard, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.render("bookSearch", {
      dashboard: true,
      loggedIn: req.session.logged_in,
      reviews,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get /bookSearch/addReview
router.get("/addReview", withGuard, (req, res) => {
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
// 
//took out withGuard
router.post("/", async (req, res) => {
  const searchTerm = req.query.q;
  console.log("searchTerm: ", req.query);
  // const query = "harry potter";
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyDzKeFljnkLIMAcUVAggnv0AYqC2_DbYAM`
    );
    const data = await response.json();
    // sends data var to the front end
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error searching for books");
  }
});

module.exports = router;
