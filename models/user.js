//User Model

const { Model, DataTypes } = require('sequelize');
// Uses bcrypt for password hashing
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    //checkPassword method is added to the class. This method will be used to compare a provided password with the hashed password stored in the database.
    return bcrypt.compareSync(loginPw, this.password);
  } //the method takes a arugement loginPw and uses bcrypt.compareSync to compare the hashed version of the pw with the hashed pw in the users db
}

// define table columns and configuration
User.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;

// The hooks section contains two hooks, beforeCreate and beforeUpdate, which are functions that automatically
// run at specific points during the process of creating or updating a user record in the database.
// In this case, these hooks are used for password hashing before the data is saved.

//A "salt round" is a parameter used in the process of hashing passwords using cryptographic algorithms like bcrypt.

// beforeCreate Hook:
// This hook runs just before a new user record is created in the database.
// It takes the new user data as an argument (newUserData).
// Inside the hook, the user's password is hashed using bcrypt.hash() with 10 salt rounds.
// The hashed password is then assigned back to newUserData.password.
// The hook returns the updated newUserData object with the hashed password.

// beforeUpdate Hook:
// This hook runs just before an existing user record is updated in the database.
// It takes the updated user data as an argument (updatedUserData).
// Similar to the beforeCreate hook, the user's password is hashed using bcrypt.hash() with 10 salt rounds.
// The hashed password is assigned back to updatedUserData.password.
// The hook returns the updated updatedUserData object with the hashed password.
