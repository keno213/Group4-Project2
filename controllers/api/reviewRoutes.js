const router = require("express").Router();
const { Review } = require("../../models");
const { apiGuard } = require("../../utils/authGuard");

// post a review
router.post("/", apiGuard, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Review.create({ ...body, user_id: req.session.user_id });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit and update a review
router.put("/:id", apiGuard, async (req, res) => {
  try {
    const [affectedRows] = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a review
router.delete("/:id", apiGuard, async (req, res) => {
  try {
    const [affectedRows] = Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
