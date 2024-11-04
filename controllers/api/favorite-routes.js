const router = require("express").Router();
const { Favorite } = require("../../models");
const { apiGuard, withGuard } = require("../../utils/auth");

router.post("/", apiGuard, async (req, res) => {
  try {
    const newFavorite = await Favorite.create({
      user_id: req.session.user_id,
      book_id: req.body.book_id,
    });
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/user", withGuard, async (req, res) => {
  try {
    const favoriteData = await Favorite.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
