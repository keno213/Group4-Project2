// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// Register Route
router.get('/register', (req, res) => {
    res.render('register'); // Render register.handlebars
});

router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    req.session.user_id = newUser.id;
    res.redirect('/'); // Redirect to home after registration
});

// Login Route
router.get('/login', (req, res) => {
    res.render('login'); // Render login.handlebars
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }

    req.session.user_id = user.id;
    res.redirect('/'); // Redirect to home after login
});

// View Users Route
router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.render('userList', { users }); // Render userList.handlebars with users data
});

module.exports = router;

