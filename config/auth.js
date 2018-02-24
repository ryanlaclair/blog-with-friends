const passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User          = require('../models/user');

const localStrategy = new LocalStrategy(User.authenticate());

const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = {
  localStrategy: localStrategy,
  verifyAuth: verifyAuth
}