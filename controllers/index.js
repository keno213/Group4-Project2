const router = require("express").Router();
const reviewController = require("./reviewController");
const userController = require("./userController");

router.use("/reviews", reviewController);
router.use("/users", userController);

router.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

module.exports = router;
