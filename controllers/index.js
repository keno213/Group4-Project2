const router = require('express').Router();
const apiRoutes = require('./api');
const homeroutes = require('./homeroutes');

router.use('/api', apiRoutes);

router.use('/', homeroutes);

module.exports = router;