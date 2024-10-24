const router = require('express').Router(); // file that starts everything, every link etc...
const apiRoutes = require('./api');
const homeroutes = require('./homeroutes');

router.use('/api', apiRoutes);

router.use('/', homeroutes);

module.exports = router;