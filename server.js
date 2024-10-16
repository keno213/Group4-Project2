
//server.js

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers'); 
const path = require('path');
const dotenv = require('dotenv');
const { syncModels } = require('./models');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

dotenv.config();

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
app.use(cookieParser());

// Session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { secure: process.env.NODE_ENV === 'production' },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}));

// Routes
app.use(routes);



app.get('/', (req,res) => {
	res.render('home');
});


	

syncModels();

// Start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, '0.0.0.0',  () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});


