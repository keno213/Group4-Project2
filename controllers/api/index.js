const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const favBookRoutes = require('./favBookRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/favBooks', favBookRoutes);

module.exports = router;
