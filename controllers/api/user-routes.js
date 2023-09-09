const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method
  User.findAll({
    attributes: { exclude: ['password'] }, // Excludes the 'password' field from the returned data
  })
    .then((dbUserData) => res.json(dbUserData)) // Send the user data as a JSON response
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); // Send a 500 Internal Server Error response with the error information
    });
});

// GET /api/users/:id (Gets user by id)
router.get('/:id', (req, res) => {
  // Find a user by their ID, excluding the 'password' field
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id, // Get the user ID from the request parameters
    },
    include: [
      //Include option
      // Include associated models in the query
      {
        model: Post,
        attributes: ['id', 'title', 'post_content', 'created_at'], // Include specific attributes from the Post model
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title'], // Include the 'title' attribute from the associated Post model
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' }); // If no user is found, send a 404 response
        return;
      }
      res.json(dbUserData); // Send the retrieved user data as a JSON response
    })
    .catch((err) => {
      console.log(err); // Log any errors for debugging
      res.status(500).json(err); // Send a 500 Internal Server Error response with the error information
    });
});

// POST /api/users
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    twitter: req.body.twitter,
    github: req.body.github,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.twitter = dbUserData.twitter;
      req.session.github = dbUserData.github;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});
