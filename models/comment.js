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
    // The 'id' field represents the unique identifier for each comment
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // The 'user_id' field represents the user who made the comment
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // The 'post_id' field represents the post to which the comment is attached
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post', // References the 'post' model
        key: 'id', // References the 'id' field in the 'post' model
      },
    },
    // The 'comment_text' field stores the actual comment text
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], // Validates that the length is at least 1 character
      },
    },
  },
  {
    sequelize,
    freezeTableName: true, // Prevents pluralization of the table name
    underscored: true, // Uses snake_case for column names
    modelName: 'comment',
  }
);

// Exports the model
module.exports = Comment;
