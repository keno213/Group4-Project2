const User = require('./User');
const Book = require('./Book');

<<<<<<< HEAD
User.hasMany(Book, {
  foreignKey: 'book_id',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Book };
=======

User.hasMany(Book, {
  foreignKey: 'boodId',
});

Book.belongsTo(User, {
    foreignKey: 'userId',
    });

module.exports = { User, Book };


>>>>>>> 30710ba76913d2b5fb999a2d3ebc94e99883d519
