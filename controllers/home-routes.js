const router = require("express").Router();
const { User, Book, Review, Favorite } = require("../models");
const { withGuard, withoutGuard } = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", withoutGuard, (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/profile");
      return;
    }
    res.render("login");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/signup", withoutGuard, (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/profile");
      return;
    }
    res.render("signup");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/profile", withGuard, async (req, res) => {
  try {
    // find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      // exclude the password column
      attributes: { exclude: ["password"] },
      // be sure to include its associated models book, favorite, and review
      include: [
        {
          model: Book,
          through: Favorite,
          as: "books",
        },
        {
          model: Review,
          include: [Book],
        },
      ],
    });
    // serialize the data
    const user = userData.get({ plain: true });
    // render the profile pass un the user data and logged_in boolean
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
