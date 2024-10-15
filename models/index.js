const User = require('./User');
const Review = require('./Review');
//const Book = require('./Book');



//User.hasMany(Book, {
//foreignKey: 'bookId',
// });

// Book.belongsTo(User, {
//     foreignKey: 'userId',
//     });

User.hasMany(Review, {
  foreignKey: 'user_id',
});

Review.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Review };


