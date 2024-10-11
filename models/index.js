const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Library = require('./library');
const User = require('./User');
const Post = require('./postModel');
const Review = require('./Review');
const Book = require('./Book');

// Define associations
User.hasMany(Library, { foreignKey: 'userId' });
Library.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' }); 

Post.hasMany(Review, { foreignKey: 'postId' });
Review.belongsTo(Post, { foreignKey: 'postId' }); 

Library.belongsTo(Book, { foreignKey: 'googleBookId', targetKey: 'id' }); 

// Sync models with database
const syncModels = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

syncModels();

// Export models
module.exports = {
    User,
    Library,
    Post,
    Review,
    Book,
    syncModels,
};
