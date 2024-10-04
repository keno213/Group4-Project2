const { Model, Datatypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Index extends Model {}

Index.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      googleBookId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
        sequelize,
        freezeTablename: true,
        underscored: true,
        modelName: 'library',
    }
);

module.exports = Index;