const User = require("./User");
const Book = require("./Book");

User.hasMany(Book, {
  foreignKey: "bookId",
});

Book.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = { User, Book };
