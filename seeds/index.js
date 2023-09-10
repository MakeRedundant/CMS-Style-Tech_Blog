const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  // Sync the database and handle success/error
  await sequelize
    .sync({ force: true })
    .then(() => {
      console.log('\n----- DATABASE SYNCED -----\n');
    })
    .catch((err) => {
      console.error('\n----- DATABASE SYNC FAILED -----\n', err);
    });
  // Seed users and handle success/error
  await seedUsers()
    .then(() => {
      console.log('\n----- USERS SEEDED -----\n');
    })
    .catch((err) => {
      console.error('\n----- USERS SEEDING FAILED -----\n', err);
    });
  // Seed posts and handle success/error
  await seedPosts()
    .then(() => {
      console.log('\n----- POSTS SEEDED -----\n');
    })
    .catch((err) => {
      console.error('\n----- POSTS SEEDING FAILED -----\n', err);
    });
  // Seed comments and handle success/error
  await seedComments()
    .then(() => {
      console.log('\n----- COMMENTS SEEDED -----\n');
    })
    .catch((err) => {
      console.error('\n----- COMMENTS SEEDING FAILED -----\n', err);
    });

  // Exit the process when all seeding is done
  process.exit(0);
};

// Call the seedAll function to start the seeding process
seedAll();

//Catch method in the promise chain to catch erros that occur at any point in the chain.
