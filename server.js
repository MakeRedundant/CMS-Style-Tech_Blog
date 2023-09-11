// // Server for Tech Blog

// Import required packages and modules
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers'); // Helper functions

const exphbs = require('express-handlebars'); // Handlebars for rendering views
const hbs = exphbs.create({ helpers }); // Create an instance of Handlebars with custom helpers

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure the session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false, //secure false beacause http and not https turns to true when not http ()
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the /assets directory/for pictures and stuff
app.use('/assets', express.static('assets'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use('/', routes); // Use the router for the root path ('/') or the path you want to use

app.use(routes);

// Turn on the connection to the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`)); // Start the server
  console.log(`Server is available at http://localhost:${PORT}/`);
});
