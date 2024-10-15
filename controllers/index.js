const router = require("express").Router();
const bookController = require("./bookController");
const userController = require("./userController");

router.use("/books", bookController);
router.use("/users", userController);

router.get("/", (req, res) => {
  res.send("Welcome to the homepage");
});

module.exports = router;
