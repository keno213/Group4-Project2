const router = require("express").Router();
const allRoutes = require("./auth.js");

router.use("/", allRoutes);

module.exports = router;
