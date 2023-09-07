const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: ['id', 'title', 'created_at', 'post_content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'twitter', 'github', 'linkedin'],
        },
      },
      {
        model: User,
        attributes: ['username', 'twitter', 'github', 'linkedin'],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('./', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});