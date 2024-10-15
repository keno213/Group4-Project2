const router = require("express").Router();
const { Review } = require("../models");

// get /reviews/
router.get("/", async (req, res) => {
  console.log("GET /reviews/ route hit");
  const allReviews = await Review.findAll();
  res.json(allReviews);
});

// get /reviews/:id
router.get("/:id", async (req, res) => {
  console.log("GET /reviews/:id route hit");
  const review = await Review.findByPk(req.params.id);
  res.json(review);
});

// post /reviews/
router.post("/", async (req, res) => {
  console.log("POST /reviews/ route hit");
  const newReview = await Review.create(req.body);
  res.json(newReview);
});

module.exports = router;
