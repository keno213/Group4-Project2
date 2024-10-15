const router = require("express").Router();
const reviewController = require("./reviewController");
const userController = require("./userController");

router.use("/reviews", reviewController);
router.use("/users", userController);

router.get("/", (req, res) => {
  console.log("Home route hit");
  // res.send("Welcome to the homepage");
  res.render("home");
});

module.exports = router;
