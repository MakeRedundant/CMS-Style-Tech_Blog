const { User } = require('../models');

const userData = [
  {
    username: 'Brain_trang',
    name: 'Brian Trang',
    twitter: 'braint',
    github: 'Makeredundant',
    email: 'brain_trang@gmail.com',
    password: '@password1',
  },
  {
    username: 'Dan_javascript',
    name: 'Dan Javascript',
    twitter: 'danj',
    github: 'danj',
    email: 'dan_javascript@gmail.com',
    password: '@password2',
  },
  {
    username: 'Merge_conflict',
    name: 'Merge Conflict',
    twitter: 'mergec',
    github: 'mergec',
    email: 'merge_conflict@gmail.com',
    password: '@password3',
  },
  {
    username: 'Homer_simpson',
    name: 'Homer Simpson',
    twitter: 'homer',
    github: 'homer',
    email: 'homer_simpson@gmail.com',
    password: '@password4',
  },
  {
    username: 'Chat_gpt',
    name: 'Chat GPT',
    twitter: 'chatgpt',
    github: 'chatgpt',
    email: 'chat_gpt@gmail.com',
    password: '@password5',
  },
  {
    username: 'error_code',
    name: 'Error code',
    twitter: 'error_c',
    github: 'errors',
    email: 'error@gmail.com',
    password: '@password6',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
