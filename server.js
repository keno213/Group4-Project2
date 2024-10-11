//server.js

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
>>>>>>> 30710ba76913d2b5fb999a2d3ebc94e99883d519

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
<<<<<<< HEAD
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));
=======
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//         db: sequelize
//     })
// }));
>>>>>>> 30710ba76913d2b5fb999a2d3ebc94e99883d519

// Routes
app.use(routes);

<<<<<<< HEAD
=======
 
>>>>>>> 30710ba76913d2b5fb999a2d3ebc94e99883d519
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});