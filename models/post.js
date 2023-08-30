// Post model

// sequelize model, datatypes, and db connection
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}
// defines the table columns and configuration
Post.init(
  {
    // Post attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        // post must be at least one char long
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      // Foreign key to associate the post with its author (user)
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

// Export the Post model to be used in other parts of the application
module.exports = Post;
