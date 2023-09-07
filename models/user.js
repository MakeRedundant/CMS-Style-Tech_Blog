//User Model

const { Model, DataTypes } = require('sequelize');
// Uses bcrypt for password hashing
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    //checkPassword method is added to the class. This method will be used to compare a provided password with the hashed password stored in the database.
    return bcrypt.compareSync(loginPw, this.password);
  } //the method takes a arugement loginPw and uses bcrypt.compareSync to compare the hashed version of the pw with the hashed pw in the users db
}

User.init(
  {
    //User attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [9], //9 char minimum
      },
    },
  },
  {
    hooks: {
      // The hooks section defines hooks, which are functions that run automatically before certain database operations. In this case, they are used to hash passwords before creating or updating user data.
      beforeCreate: async (newUserData) => {
        // beforeCreate hook: Hashes the password before a new user record is created.
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        //The await bcrypt.hash(password, saltRounds) function is used to hash the password with a specified number of salt rounds (10 in this case).
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        // hook: Hashes the password before an existing user record is updated.
        updatedUserData.password = await bcrypt.hash(
          //await bcrypt.hash(password, saltRounds) function is used to hash the password with a specified number of salt rounds (10 in this case).
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
