//Comment Model

//Sequelize model, datatypes (objects), and db connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// the Comment model extends the sequelize model
class Comment extends Model {}
// Declares the class a class named comment and the class will inherit from the sequelize model class

// Defines the comment
Comment.init(
  {
    // comment attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], //1 char minimum
      },
    },
    user_id: {
      // an integer that references the id column of the user table (establishes a relationship between comments and users)
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the User model
        key: 'id', // Using the id column of the User model
      },
    },
    post_id: {
      // referneces the id column of the post table. Establishes a relationship between comments and posts
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    // Sequelize instance for database connection
    sequelize,
    // Prevent Sequelize from altering the table name
    freezeTableName: true,
    // Convert camelCase attribute names to snake_case column names
    underscored: true,
    // Set the model name for various operations
    modelName: 'comment',
  }
);

// Exports the model
module.exports = Comment;
