const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
//This requires PostgreSQL as the database. If you are using a different database, you may need to adjust the data types for the author column. Consider storing authors as a JSON string or creating a separate Author model with associations.
class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // The id from Google Books API
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    infoLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: false,
    modelName: "book",
  }
);

module.exports = Book;
