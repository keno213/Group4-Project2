const router = require("express").Router();
const { Review } = require("../../models");
const { apiGuard, withGuard } = require("../../utils/auth");

router.post("/", apiGuard, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/user", withGuard, async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
