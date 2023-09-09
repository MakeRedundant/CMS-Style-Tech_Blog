// // Like Model NOT IN USE

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// // Define the Like class that extends the Sequelize Model class
// class Like extends Model {}

// // Initialize the Like model with attributes and configuration
// Like.init(
//   {
//     // Like attributes
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },

//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'user', // References the User model
//         key: 'id', // Using the id column of the User model
//       },
//       // Foreign key to associate the like with the user who liked the post
//     },

//     post_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'post', // References the Post model
//         key: 'id', // Using the id column of the Post model
//       },
//       // Foreign key to associate the like with the post being liked
//     },
//   },
//   {
//     // Model configuration

//     sequelize, // Sequelize instance for database connection

//     freezeTableName: true, // Prevent Sequelize from altering the table name
//     underscored: true, // Convert camelCase attribute names to snake_case column names
//     modelName: 'like', // Set the model name for various operations
//   }
// );

// // Export the Like model to be used in other parts of the application
// module.exports = Like;
