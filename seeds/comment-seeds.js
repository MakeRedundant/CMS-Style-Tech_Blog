const { Comment } = require('../models');

const commentData = [
  {
    user_id: 4, //homer
    post_id: 5,
    comment_text: 'This is going to make me redundant!!',
  },
  {
    user_id: 4, //homer
    post_id: 1,
    comment_text: 'Can you teach me how to use google?',
  },
  {
    user_id: 4, //homer
    post_id: 1,
    comment_text: 'Can you teach me how to turn on my computer?',
  },
  {
    user_id: 4, //homer
    post_id: 2,
    comment_text: 'I agree, we should yell at more clouds to show them!',
  },
  {
    user_id: 4, //Meme investor
    post_id: 4,
    comment_text: 'Will this make my meme stocks go up?!',
  },
  {
    user_id: 4, //Meme investor
    post_id: 3,
    comment_text: 'HI everyone you should all invest into NFT Monkeys instead',
  },
  {
    user_id: 1, //Brian
    post_id: 4,
    comment_text: 'Technology scares me, we should go back to the feudal age',
  },
  {
    user_id: 1, //Brian
    post_id: 6,
    comment_text: 'I trust AI to hold our nuclear weapons',
  },
  {
    user_id: 3, //Midlife crisis/Merge_conflict;
    post_id: 3,
    comment_text: 'Will AI cure my lonliness?',
  },
  {
    user_id: 3, //Merge_conflict;
    post_id: 1,
    comment_text: 'I hate my current job, can IT get me a 900k job?',
  },
  {
    user_id: 3, //Merge conflict
    post_id: 4,
    comment_text: 'Technology sounds hard',
  },
  {
    user_id: 5, //Chat gpt
    post_id: 3,
    comment_text: 'AI sounds good, we should leave our weapon systems to AI',
  },
  {
    user_id: 6, //Error code
    post_id: 6,
    comment_text: 'AI isnt real',
  },
  {
    user_id: 2, //Nhilistic/Dan_javascript;
    post_id: 5,
    comment_text: 'Can i sell my house?',
  },
  {
    user_id: 2, //Nhilistic/Dan_javascript;
    post_id: 3,
    comment_text:
      'AI will be the end of humanity! Lets go back to making cat videos',
  },
  {
    user_id: 2, //Nhilistic/Dan_javascript;
    post_id: 1,
    comment_text: 'IT sounds evil, you should become a cat instead!',
  },
  {
    user_id: 2, //Nhilistic/Dan_javascript;
    post_id: 6,
    comment_text: 'This sounds pretty legit to me',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
