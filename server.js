const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers'); // Assuming you have an index.js in controllers that exports all routes
const path = require('path');
<<<<<<< HEAD
// const dotenv = require('dotenv');

// dotenv.config();
=======
//const dotenv = require('dotenv');

//dotenv.config();
>>>>>>> 2505ebd756059f62a0c812914c267e2a9cf1d188

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars.js as the templating engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}));

// Routes
app.use(routes);

 
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
