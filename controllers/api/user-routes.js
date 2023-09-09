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

// POST /api/users (Create a new user)
router.post('/', (req, res) => {
  // Create a new user in the database using the User model and data from the request body
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
      req.session.loggedIn = true; // Set loggedIn status to true

      res.json(dbUserData);
    });
  });
});

//This code creates a new user in the database, extracts user data from the request body,
//and then saves the user's session information to log them in. Finally,
//it responds with the newly created user's data in JSON format.

// LOGIN: POST /api/users/login (User login)
router.post('/login', (req, res) => {
  // Finds a user in the database by their email address provided in the request body
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    // If no user with that email address is found, respond with an error
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    // Check if the provided password matches the hashed password stored in the database
    const validPassword = dbUserData.checkPassword(req.body.password);

    // If the password is incorrect, respond with an error
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // If login is successful, save the user's session data (log them in)
    req.session.save(() => {
      // Declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.twitter = dbUserData.twitter;
      req.session.github = dbUserData.github;
      req.session.loggedIn = true; // Set loggedIn status to true

      // Respond with a JSON message and the user's data confirming successful login
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

//This code handles the login process for users. It searches for a user with the provided email,
// checks if the password is correct, and, if successful, saves the user's session data to log them in.
// Finally, it responds with a JSON message confirming the successful login and includes the user's data.

// LOGOUT: POST /api/users/logout (User logout)
router.post('/logout', (req, res) => {
  // Check if the user is currently logged in (has an active session)
  if (req.session.loggedIn) {
    // If logged in, destroy the session (log the user out)
    req.session.destroy(() => {
      console.log('User logged out successfully.');
      // Respond with a 204 No Content status (indicating success with no response body)
      res.status(204).end();
    });
  } else {
    // If the user is not logged in (no active session), log a message for the 404 error
    console.log('User attempted to log out but was not logged in.');
    // Respond with a 404 Not Found status
    res.status(404).end();
  }
});

//This code checks if the user is logged in by examining the req.session.loggedIn property.
//If the user is logged in, it destroys the session using req.session.destroy()
//It responds with a status code 204 (No Content) to indicate that the logout was successful
//If the user is not logged in (no active session), it responds with a status code 404 (Not Found) to indicate that there's nothing to log out from

// PUT /api/users/1 for updating a user information
router.put('/:id', withAuth, (req, res) => {
  // Update the user's information based on the request body
  User.update(req.body, {
    individualHooks: true, // Enable individual model hooks (e.g., beforeUpdate)
    where: {
      id: req.params.id, // Find the user to update by ID from the request parameters
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        // If no user was found with the specified ID, send a 404 Not Found response
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      // Send a JSON response with the updated user data
      res.json(dbUserData);
    })
    .catch((err) => {
      // If there's an error during the update process, log the error and send a 500 Internal Server Error response
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
  // Delete a user by their ID
  User.destroy({
    where: {
      id: req.params.id, // Find the user to delete by ID from the request parameters
    },
  })
    .then((dbUserData) => {
      // Check if a user was found and deleted
      if (!dbUserData) {
        // If no user found, send a 404 Not Found response
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      // If deletion was successful, send the deleted user data as a JSON response
      res.json(dbUserData);
    })
    .catch((err) => {
      // Handle errors (e.g., database error)
      console.log(err); // Log the error for debugging
      res.status(500).json(err); // Send a 500 Internal Server Error response with error information
    });
});

module.exports = router;
