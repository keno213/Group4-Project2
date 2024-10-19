const User = require("./User");
const Review = require("./Review");
const Book = require("./Book");
const FavBook = require("./FavBook");

//User Relations
User.hasMany(Book, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Book.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//Review Relations
User.hasMany(Review, {
  foreignKey: "review_id",
  onDelete: "CASCADE",
});
Review.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//Book Relations
Book.hasMany(Review, {
  foreignKey: "review_id",
  onDelete: "CASCADE",
});
Review.belongsTo(Book, {
  foreignKey: "book_id",
  onDelete: "CASCADE",
});

//FavBook Relations
User.hasMany(FavBook, {
  foreignKey: "favBook_id",
  onDelete: "CASCADE",
});
FavBook.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Review, Book, FavBook };
