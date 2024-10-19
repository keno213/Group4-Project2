const router = require("express").Router();
// const { FavBook } = require("../models");
const { withGuard } = require("../../utils/authGuard");

router.get("/", withGuard, async (req, res) => {
  res.send("favBook route was hit");
  console.log("favBook route was hit");
  // try {
  //   res.render("favBook", {
  //     dashboard: true,
  //     loggedIn: req.session.logged_in,
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
