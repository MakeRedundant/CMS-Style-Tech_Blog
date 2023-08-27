const Sequelize = require('sequelize');
require('dotenv').config(); //Loads environment variables from a .env file into the process.env object.

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL); // The code sets up a connection to the database based on whether the process.env.JAWSDB_URL environment variable is present.
// This variable is typically provided by hosting platforms like Heroku to establish a database connection.
} else { //if process.env.JAWSDB_URL doesnt exists create a new instance
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
