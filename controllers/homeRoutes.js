const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Home route that displays all posts and associated comments
router.get('/', (req, res) => {
  console.log('Home route accessed'); // Add this line
  console.log(req.session);

  // Fetch all posts and their associated comments and authors
  Post.findAll({
    attributes: ['id', 'title', 'created_at', 'post_content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github'],
        },
      },
      {
        model: User,
        attributes: ['username', 'github'],
      },
    ],
  })
    .then((PostData) => {
      // Serialize the data for rendering
      const posts = PostData.map((post) => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login route, redirects to home if already logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Signup route, redirects to home if already logged in
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// Single post route that displays a specific post and its comments
router.get('/post/:id', (req, res) => {
  // Find a specific post by ID and include associated comments and authors
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'created_at', 'post_content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'github'],
        },
      },
      {
        model: User,
        attributes: ['username', 'github'],
      },
    ],
  })
    .then((PostData) => {
      if (!PostData) {
        // If no post found, return a 404 response
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // Serialize the data for rendering
      const post = PostData.get({ plain: true });

      // Pass data to the template for rendering
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
