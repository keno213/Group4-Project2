const User = require("./User");
const Review = require("./Review");
const Book = require("./Book");

User.hasMany(Review, {
  foreignKey: "book_id",
});

Review.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Review, Book };
