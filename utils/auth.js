const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;

//in summary, this middleware ensures that a user is authenticated (i.e., has a valid user session) before allowing access to certain routes.
// If not authenticated, it redirects the user to a login page, and if authenticated, it lets the request proceed to the protected route.

//When any request is made to a route that uses withAuth
//it checks if req.session.user.iq exist,
//if it doesnt not exist (user not authenicated it redirects to the login route, so the user is not logged in and they need to log in)
//if it does exist it calls next() which is a function that tells express to move on in the chain.
