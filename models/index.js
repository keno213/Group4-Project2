const Book = require("./Book");
const Favorite = require("./Favorite");
const Review = require("./Review");
const User = require("./User");

// User 1:M Review
User.hasMany(Review, {
  // PK User.id connects to FK Review.userId
  foreignKey: "user_id",
});

Review.belongsTo(User, {
  // FK created in Review Table
  foreignKey: "user_id",
});

//Book 1:M Review
Book.hasMany(Review, {
  // PK Book.id connects to FK Review.bookId
  foreignKey: "book_id",
});

Review.belongsTo(Book, {
  // FK created in Review Table
  foreignKey: "book_id",
});
// User M:M Book
User.belongsToMany(Book, {
  through: Favorite,
  foreignKey: "user_id",
});
// Book M:M User
Book.belongsToMany(User, {
  through: Favorite,
  foreignKey: "book_id",
});

module.exports = { Book, Favorite, Review, User };
