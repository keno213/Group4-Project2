const router = require("express").Router();
const { FavBook } = require("../../models");
const { withGuard } = require("../../utils/authGuard");
// /api/favBooks/
router.get("/", withGuard, async (req, res) => {
  // res.send("favBook route was hit");
  console.log("favBook route was hit");
  try {
    const favData = await FavBook.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const favBooks = favData.map((favBooks) => favBooks.get({ plain: true }));
    res.render("favBook", {
      dashboard: true,
      loggedIn: req.session.logged_in,
      favBooks,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// /api/favBooks/addBook
router.post("/addBook", withGuard, async (req, res) => {
  console.log("addBook route was hit");
  try {
    const newFavBook = await FavBook.create({
      user_id: req.session.user_id,
      book_id: req.body.bookId,
    });
    res.status(200).json(newFavBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
