const sequelize = require("../config/connection");
const { User, Review, Book, FavBook } = require("../models");

const userData = require("./userData.json");
const reviewData = require("./reviewData.json");
const bookData = require("./bookData.json");
const favBookData = require("./favBookData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // seed users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // seed reviews
  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // seed favorite books
  for (const favBook of favBookData) {
    await FavBook.create({
      ...favBook,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // seed books
  for (const book of bookData) {
    await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
