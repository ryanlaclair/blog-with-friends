// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User          = require('../models/user');

// set up the passport-local authentication strategy
const localStrategy = new LocalStrategy(User.authenticate());

// Middleware to verify that the user is authenticated, used on all routes
// except login and register.
const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

// Middleware to verify that the logged in user matches the personal blog
// feed that is being modified.
const verifyUser = (req, res, next) => {
  if (req.params.user == req.user._id) {
    return next();
  }

  res.redirect('/' + req.user._id);
}

// set up passport serialization and deserialization for user session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = {
  localStrategy: localStrategy,
  verifyAuth: verifyAuth,
  verifyUser: verifyUser
}