const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api/");
const bookSearchRoutes = require("./bookSearchRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/bookSearch", bookSearchRoutes);

module.exports = router;
