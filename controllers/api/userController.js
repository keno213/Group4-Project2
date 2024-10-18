const router = require ('express').Router();
const { User } = require('../../models');

// router.get('/', async (req, res) => {
//     console.log("GET /users/ route hit");
//     res.render("body");
// })


router.get("/", async (req, res) => {
    console.log("GET /users/ route hit");
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})




// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});




// User login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        
        const validPassword = await userData.checkPassword(req.body.password);
        
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    console.log("POST /signup route hit");
    try {
        //create a user
        const userData = await User.create(req.body);
    
       
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
        
    } catch (err) {
        res.status(400).json(err);
    }
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;