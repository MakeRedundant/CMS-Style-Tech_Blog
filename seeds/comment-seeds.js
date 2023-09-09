const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1, //Old man yells at clouds
    post_id: 5,
    comment_text: 'This is going to make me redundant!!',
  },
  {
    user_id: 4, //Meme investor
    post_id: 4,
    comment_text: 'Will this make my meme stocks go up?!',
  },
  {
    user_id: 1,
    post_id: 4,
    comment_text: 'Technology scares me, we should go back to the feudal age',
  },
  {
    user_id: 3, //Midlife crisis
    post_id: 5,
    comment_text: 'Will AI cure my lonliness?',
  },
  {
    user_id: 3,
    post_id: 2,
    comment_text: 'I hate my current job, can IT get me a 900k job?',
  },
  {
    user_id: 3,
    post_id: 4,
    comment_text: 'Technology sounds hard',
  },
  {
    user_id: 5, //Optimistic student
    post_id: 3,
    comment_text: 'I hope IT lands me a 900k job, fresh outta UNI',
  },
  {
    user_id: 2, //Nhilistic student
    post_id: 1,
    comment_text:
      'AI will be the end of humanity! Lets go back to making cat videos',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
