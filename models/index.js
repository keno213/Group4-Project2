const Book = require("./Book");
const Favorite = require("./Favorite");
const Review = require("./Review");
const User = require("./User");

//Book 1:M Review
Book.hasMany(Review, {
  // PK Book.id connects to FK Review.bookId
});
Review.belongsTo(Book, {
  // FK created in Review Table
  foreignKey: "fkBookId",
});

//Book 1:M Favorite
Book.hasMany(Favorite, {
  // PK Book.id connects to FK Favorite.bookId
});
Favorite.belongsTo(Book, {
  // FK created in Favorite Table
  foreignKey: "fkBookId",
});

// User 1:M Favorite
User.hasMany(Favorite, {
  // PK User.id connects to FK Favorite.userId
});
Favorite.belongsTo(User, {
  // FK created in Favorite Table
  foreignKey: "fkUserId",
});

// User 1:M Review
User.hasMany(Review, {
  // PK User.id connects to FK Review.userId
});
Review.belongsTo(User, {
  // FK created in Review Table
  foreignKey: "fKUserId",
});

//User 1:M Book
User.hasMany(Book, {
  // PK User.id connects to FK Book.userId
});
Book.belongsTo(User, {
  // FK created in Book Table
  foreignKey: "fkUserId",
});

module.exports = { Book, Favorite, Review, User };
