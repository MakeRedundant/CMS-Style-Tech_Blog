const { User } = require('../models');

const userData = [
  {
    username: 'Brain_trang',
    name: 'Brian Trang',
    github: 'Makeredundant',
    email: 'brain_trang@gmail.com',
    password: '1234',
  },
  {
    username: 'Dan_javascript',
    name: 'Dan Javascript',
    github: 'danj',
    email: 'dan_javascript@gmail.com',
    password: '@password2',
  },
  {
    username: 'Merge_conflict',
    name: 'Merge Conflict',
    github: 'mergec',
    email: 'merge_conflict@gmail.com',
    password: '@password3',
  },
  {
    username: 'Homer_simpson',
    name: 'Homer Simpson',
    github: 'homer',
    email: 'homer_simpson@gmail.com',
    password: '@password4',
  },
  {
    username: 'Chat_gpt',
    name: 'Chat GPT',
    github: 'chatgpt',
    email: 'chat_gpt@gmail.com',
    password: '@password5',
  },
  {
    username: 'error_code',
    name: 'Error code',
    github: 'errors',
    email: 'error@gmail.com',
    password: '@password6',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
