const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route for displaying the user's posts
router.get('/', withAuth, (req, res) => {
  // Find all posts created by the user who is currently logged in
  Post.findAll({
    where: {
      // Use the ID from the session to filter posts by the current user
      user_id: req.session.user_id,
    },
    attributes: ['id', 'title', 'created_at', 'post_content'],
    include: [
      // Include comments associated with each post
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          // Include user information for comment authors
          model: User,
          attributes: ['username', 'github'],
        },
      },
      // Include user information for the post creator
      {
        model: User,
        attributes: ['username', 'github'],
      },
    ],
  })
    .then((PostData) => {
      // Serialize data (convert to plain objects) before passing to the template
      const posts = PostData.map((post) => post.get({ plain: true }));
      // Render the 'dashboard' template and provide it with post data and logged-in status
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch((err) => {
      // Handle errors (e.g., database error)
      console.log(err); // Log the error for debugging
      res.status(500).json(err); // Send a 500 Internal Server Error response with error information
    });
});

// GET Route for Editing a Post by ID
// This route retrieves a post by its ID for editing and renders an 'edit-post' template.
// It also fetches related comments and user data for the post.
router.get('/edit/:id', withAuth, (req, res) => {
  // Use Sequelize to find a post by its unique ID
  Post.findOne({
    where: {
      id: req.params.id,
    },
    // Specify which attributes of the post to retrieve
    attributes: ['id', 'title', 'created_at', 'post_content'],
    // Include related data:
    include: [
      {
        // Include comments associated with the post
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          // Include user information for comment authors
          model: User,
          attributes: ['username', 'github'],
        },
      },
      {
        // Include user information for the post creator
        model: User,
        attributes: ['username', 'github'],
      },
    ],
  })
    .then((PostData) => {
      // Check if a post with the specified ID was found
      if (!PostData) {
        // If not found, send a 404 Not Found response
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // Serialize the post data (convert to a plain JavaScript object)
      const post = PostData.get({ plain: true });

      // Render the 'edit-post' template, passing the post data and a loggedIn flag
      res.render('edit-post', {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      // Handle errors (e.g., database error)
      console.log(err); // Log the error for debugging
      res.status(500).json(err); // Send a 500 Internal Server Error response with error information
    });
});

// GET Route for Creating a New Post
// This route retrieves posts created by the currently logged-in user to display in the 'create-post' template.
router.get('/create/', withAuth, (req, res) => {
  // Use Sequelize to find all posts created by the current user
  Post.findAll({
    where: {
      // Filter posts by user ID from the session
      user_id: req.session.user_id,
    },
    // Specify which attributes of the posts to retrieve
    attributes: ['id', 'title', 'created_at', 'post_content'],
    // Include related data:
    include: [
      {
        // Include comments associated with each post
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          // Include user information for comment authors
          model: User,
          attributes: ['username', 'github'],
        },
      },
      {
        // Include user information for the post creator
        model: User,
        attributes: ['username', 'github'],
      },
    ],
  })
    .then((PostData) => {
      // Serialize post data before rendering the template
      const posts = PostData.map((post) => post.get({ plain: true }));

      // Render the 'create-post' template, passing the posts data and a loggedIn flag
      res.render('create-post', { posts, loggedIn: true });
    })
    .catch((err) => {
      // Handle errors (e.g., database error)
      console.log(err); // Log the error for debugging
      res.status(500).json(err); // Send a 500 Internal Server Error response with error information
    });
});

module.exports = router;
