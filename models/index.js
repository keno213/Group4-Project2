const User = require('./User');
const Book = require('./Book');

User.hasMany(Book, {
  foreignKey: 'book_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Book };