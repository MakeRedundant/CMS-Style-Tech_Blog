const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all posts and their associated users and comments
router.get('/', (req, res) => {
  console.log('All users');
  // Use the Post model to find all posts, along with associated comments and users
  Post.findAll({
    attributes: ['id', 'title', 'created_at', 'post_content'], // Specify the attributes to include in the result
    order: [['created_at', 'DESC']], // Order the results by creation date in descending order
    include: [
      // Include the Comment model with its associated User model (for username information)
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'twitter', 'github'],
        },
      },
      // Include the User model (for additional user information)
      {
        model: User,
        attributes: ['username', 'twitter', 'github'],
      },
    ],
  })
    .then((PostData) => res.json(PostData)) // If successful, send the JSON response with the retrieved data
    .catch((err) => {
      console.log(err);
      res.status(500).json(err + 'Unsuccessful, there was a error'); // Send a 500 Internal Server Error response with the error information
    });
});

// Get a single post by its ID
router.get('/:id', (req, res) => {
  // Use the Post model to find one post with the specified ID
  Post.findOne({
    where: {
      id: req.params.id, // Get the ID from the route parameters
    },
    attributes: ['id', 'title', 'created_at', 'post_content'], // Specify the attributes to include in the result
    include: [
      // Include the User model for additional user information
      {
        model: User,
        attributes: ['username', 'twitter', 'github'],
      },
      // Include the Comment model with its associated User model (for comment author information)
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'twitter', 'github'],
        },
      },
    ],
  })
    .then((PostData) => {
      if (!PostData) {
        // If no post was found with the specified ID, send a 404 Not Found response
        res
          .status(404)
          .json({ message: 'Unsuccessful, No post found with this id' });
        return;
      }
      // If a post was found, send a JSON response with the retrieved post data
      res.json(PostData);
    })
    .catch((err) => {
      console.log(err); // Log any errors for debugging
      // Send a 500 Internal Server Error response with the error information
      res.status(500).json({
        message: 'Internal Server Error: Unsuccessful due to an error',
      });
    });
});

// Create a new post using the POST method
router.post('/', withAuth, (req, res) => {
  // Use the Post model's create method to insert a new post into the database
  Post.create({
    title: req.body.title, // Extract the title from the request body
    post_content: req.body.post_content, // Extract the post content from the request body
    user_id: req.session.user_id, // Set the user_id for the post to the currently logged-in user
  })
    .then((PostData) => {
      // If the post is successfully created, send the post data as a JSON response
      res.json(PostData);
    })
    .catch((err) => {
      // If there's an error during the creation process:
      console.log(err); // Log the error for debugging
      res.status(500).json(err); // Send a 500 Internal Server Error response with the error information
    });
});

// DELETE route for deleting a post by ID
router.delete('/:id', withAuth, (req, res) => {
  // Use the Post model to delete a post with the specified ID
  Post.destroy({
    where: {
      id: req.params.id, // Find the post by its ID from the request parameters
    },
  })
    .then((PostData) => {
      // Check if a post with the specified ID was found and deleted
      if (!PostData) {
        // If no post was found, send a 404 Not Found response
        res
          .status(404)
          .json({ message: 'Unsuccessful, No post was found with this id' });
        return;
      }
      // If the post was successfully deleted, send a JSON response with the deleted data
      res.json(PostData);
    })
    .catch((err) => {
      // If there's an error during the deletion process, log the error and send a 500 Internal Server Error response
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
