const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
 host: process.env.DB_HOST,
 port: process.env.DB_PORT,
 dialect: 'postgres',
});

const sequelizeFromUrl = new Sequelize(process.env.DATABASE_URL);

//test connection

	sequelize.authenticate()
		.then(() => {
			console.log('Connection to the database has been established successfully.');
		})
			
		.catch(err => {
			console.error('Unable to connect to the database:',err);
		});

const googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY;

module.exports = sequelize;
