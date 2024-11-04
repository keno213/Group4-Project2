const router = require("express").Router();
const bookRoutes = require("./book-routes");
const favoriteRoutes = require("./favorite-routes");
const reviewRoutes = require("./review-routes");
const userRoutes = require("./user-routes");

router.use("/books", bookRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/reviews", reviewRoutes);
router.use("/users", userRoutes);

module.exports = router;
