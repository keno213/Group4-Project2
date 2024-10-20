const router = require("express").Router();
const { Review } = require("../models");
const { withGuard } = require("../utils/authGuard");
// routes = get /bookSearch
// post / bookSearch, /bookSearch/addReview
// delete /bookSearch/deleteReview

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

// post /bookSearch/addReview
router.post("/addReview", withGuard, async (req, res) => {
  Review.create({
    title: req.body.title,
    body: req.body.body,
    // rating: req.body.rating, not using the ratings
    user_id: req.session.user_id,
  });
  // get all reviews
  const reviewData = await Review.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });
  // serialize the results from sequelize
  const reviews = reviewData.map((review) => review.get({ plain: true }));
  //render the page
  res.render("addReview", {
    dashboard: true,
    loggedIn: req.session.logged_in,
    reviews,
  });
});

// post /bookSearch
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

// delete /bookSearch/deleteReview
router.delete("/deleteReview", withGuard, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
