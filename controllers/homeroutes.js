const express = require('express');

const router = express.Router();

// Define a simple route for the home page
router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.logged_in
    });
});
router.get('/login', (req, res) => {
    res.render('login', {
        loggedIn: req.session.logged_in
    });
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.logged_in
    });
});
router.get('/favorites', (req, res) => {
    res.render('favorites', {
        loggedIn: req.session.logged_in
    });
});
router.get('/newreview', (req, res) => {
    res.render('Newreviewform', {
        loggedIn: req.session.logged_in
    });
});

module.exports = router;