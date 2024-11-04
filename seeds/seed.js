const sequelize = require("../config/connection");
const { Book, Favorite, Review, User } = require("../models");

const bookData = require("./bookData.json");
const favoriteData = require("./favoriteData.json");
const reviewData = require("./reviewData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced!");
    // Seed users with password hashing
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("Users seeded!");

    // Seed books
    const books = await Book.bulkCreate(bookData, {
      returning: true,
    });
    console.log("Books seeded!");

    // Seed favorites
    const favorites = await Favorite.bulkCreate(favoriteData, {
      returning: true,
    });
    console.log("Favorites seeded!");

    // Seed reviews
    const reviews = await Review.bulkCreate(reviewData, {
      returning: true,
    });
    console.log("Reviews seeded!");

    // clean exit
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
