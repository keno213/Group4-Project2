// const { Model, DataTypes } = require(`sequelize`);
// const sequelize = require(`../config/connection`);

// class Book extends Model {}

// Book.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     googleBookId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: `user`,
//             key: `id`,
//         },
//     }
//   },
//   {
//     sequelize,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "library",
//   }
// );


// module.exports = Book;