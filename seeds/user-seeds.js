const { User } = require('../models');

const userData = [
  {
    username: 'Brain_trang',
    twitter: 'braint',
    github: 'Makeredundant',
    email: 'brain_trang@gmail.com',
    password: '@password1',
  },
  {
    username: 'Dan_javascript',
    twitter: 'danj',
    github: 'danj',
    email: 'dan_javascript@gmail.com',
    password: '@password2',
  },
  {
    username: 'Merge_conflict',
    twitter: 'mergec',
    github: 'mergec',
    email: 'merge_conflict@gmail.com',
    password: '@password3',
  },
  {
    username: 'Homer_simpson',
    twitter: 'homer',
    github: 'homer',
    email: 'homer_simpson@gmail.com',
    password: '@password4',
  },
  {
    username: 'Chat_gpt',
    twitter: 'chatgpt',
    github: 'chatgpt',
    email: 'chat_gpt@gmail.com',
    password: '@password5',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
