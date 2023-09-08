// Import Dependencies
const router = require('express').Router();
const { Comment } = require('../../models'); //   Import the Comment model
const withAuth = require('../../utils/auth'); // Import an authentication utility

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
  //withAuth is middleware
  //(req, res) => this is the route handler function, It's a callback function that gets executed when an HTTP POST request
  // req object represents the incoming request
  // res object represents the response that will be sent to the cilent
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

//Defines a delete Route for Comments
router.delete('/:id', withAuth, (req, res) => {
  // Use the Comment model to delete a comment with the specified ID
  Comment.destroy({
    where: {
      id: req.params.id, // Find the comment by its ID from the request parameters
    },
  })
    .then((CommentData) => {
      if (!CommentData) {
        // If no comment was found with the specified ID, send a 404 Not Found response
        res
          .status(404)
          .json({ message: 'Unsuccessful, No comment found with this id' });
        return;
      }
      // If the comment was successfully deleted, send a JSON response with the deleted data
      res.json(CommentData);
    })
    .catch((err) => {
      // If there's an error during the deletion process, log the error and send a 500 Internal Server Error response
      console.log(err);
      res.status(500).json(err);
    });
});

// Export the Router
module.exports = router;
