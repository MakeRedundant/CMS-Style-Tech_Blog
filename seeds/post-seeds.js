const { Post } = require('../models');

const postData = [
  {
    title: 'Midlife crisis! My journey into IT from my deadend job',
    post_content:
      'This is my journey from being a boring optometrist into a full stack web developer',
    user_id: 3,
  },
  {
    title: 'Technology scares me!!',
    post_content:
      'Back in my day we would yell at clouds, now we yell at Amazon clouds?',
    user_id: 1,
  },
  {
    title: 'Chat GPT Replaces all politicians, productivity goes up 999%',
    post_content:
      'Ever since the country of Australia has replaced REAs and politicians with chat GPT the country has invented time travel, cured unahppiness and created a utopia',
    user_id: 2,
  },
  {
    title: 'Tech job outlook is 0.1% more positive',
    post_content:
      'Seek.com declares 0.1% more job postings for entry/junior IT jobs (still requires 9 yrs experience)',
    user_id: 5,
  },
  {
    title: 'AI powered monkey.jpgs moons 999%',
    post_content:
      'This is finanicial advice to spend all your money on monkeys',
    user_id: 4,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
