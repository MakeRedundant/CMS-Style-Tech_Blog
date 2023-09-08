// Import Dependencies
const router = require('express').Router();
const { Comment } = require('../../models'); //   Import the Comment model
const withAuth = require('../../utils/auth'); // Import an authentication utility (not used in this route)

//../../models means: Go up two levels, then enter the models directory.

/// Router routes

// Define a GET Route for Retrieving Comments
router.get('/', (req, res) => {
  // Retrieve all comments from the database
  Comment.findAll({})
    .then((CommentData) => {
      // If successful, send the comment data as a JSON response
      res.json(CommentData);
    })
    .catch((err) => {
      // If there's an error, log it to the console and send a 500 Internal Server Error response
      console.log(err + ' Unsuccessful, there was an error');
      res.status(500).json(err);
    });
});

// Define a POST Route for Posting Comments
router.post('/', withAuth, (req, res) => {
  // Check the session to ensure user authentication
  if (req.session) {
    // Create a new comment in the database
    Comment.create({
      comment_text: req.body.comment_text, // Extract comment text from the request body
      post_id: req.body.post_id, // Extract post ID from the request body
      user_id: req.session.user_id, // Use the user ID from the session as the user ID for the comment
    })
      .then((CommentData) => {
        // If the comment creation is successful, send the created comment data as a JSON response
        res.json(CommentData);
      })
      .catch((err) => {
        // If there's an error during comment creation, log the error and send a 400 Bad Request response
        console.log(err + ' Unsuccessful, there was an error');
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((CommentData) => {
      if (!CommentData) {
        res
          .status(404)
          .json({ message: 'Unsuccessful, No comment found with this id' });
        return;
      }
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Export the Router
module.exports = router;
