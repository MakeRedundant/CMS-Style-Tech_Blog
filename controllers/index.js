// // Dependencies \\
// // Server connection

const router = require('express').Router();
// // API routes folder
const apiRoutes = require('./api');
// // Homepage routes
const homeRoutes = require('./homeRoutes');
// // Dashboard Routes
const dashboardRoutes = require('./dashboardRoutes');

// // Defines paths for different types of routes
// /// An API route/API endpoint is a specific URL that represents a unique resource or functionality within a web application's API
router.use('/api', apiRoutes);

// // Home Page Routes: Routes for rendering and handling requests on the home page
router.use('/', homeRoutes);

// // Dashboard Routes: Routes for rendering and handling requests on the dashboard
router.use('/dashboard', dashboardRoutes);

// // Catch-All Route: Handles requests for resources that don't match any defined route
router.use((req, res) => {
  // Respond with a 404 status for resource not found
  res.status(404).end();
});
// //The catch-all route is a fallback route that is executed when none of the previous routes match the requested resource.

module.exports = router;

// This index.js acts as central entry point for organising the apps routes.
// It mounts different route modules under specific paths and provides a catch-all route for handling undefined routes.

// // An index.js file responsible for organizing and configuring the routing for your application's API endpoints,
// // as well as handling requests that don't match any defined routes with a 404 response.
// // It also demonstrates the modular approach often used in Express.js applications to keep code organized and maintainable.
