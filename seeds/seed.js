const sequelize = require("../config/connection");
const { Book, Favorite, Review, User } = require("../models");

const bookData = require("./bookData.json");
const favoriteData = require("./favoriteData.json");
const reviewData = require("./reviewData.json");
const userData = require("./userData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // seed users must be first
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // seed books
  for (const book of bookData) {
    await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // seed favorites
  for (const favorite of favoriteData) {
    await Favorite.create({
      ...favorite,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // seed reviews
  for (const review of reviewData) {
    await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      book_id: bookData[Math.floor(Math.random() * bookData.length)].id,
    });
  }
  process.exit(0);
};
seedDatabase();
