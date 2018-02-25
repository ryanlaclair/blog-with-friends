const express  = require('express'),
      passport = require('passport'),
      flash    = require('connect-flash'),
      User     = require('../models/user');

const login = express.Router();

// GET /
//
// Redirect to the login route.
login.get('/', (req, res) => {
  res.redirect('/login');
});

// GET /register
//
// Render the register view to allow a new user to register for the service.
login.get('/register', (req, res) => {
  res.render('register', {
    message: req.flash('error')
  });
});

// POST /register
//
// Register a new user for the service.
login.post('/register', (req, res) => {
  User.register(new User({
    name: {
      first: req.body.firstname,
      last: req.body.lastname
    },
    email: req.body.email,
    blogs: [],
    friends: [],
    username: req.body.username 
  }), req.body.password, (err, user) => {
    if (err) {
      req.flash('error', 'User exists, please try again');
      return res.redirect('/register');
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/feed');
    });
  });
});

// GET /login
//
// Render the login view to allow a user to log in to the service.
login.get('/login', (req, res) => {
  res.render('login', {
    message: req.flash('error')
  });
});

// POST /login
//
// Authenticate a user logging in.
login.post('/login', passport.authenticate('local', {
  successRedirect: '/feed',
  failureRedirect: '/login',
  failureFlash: 'Invalid login, please try again'
}));

// GET /logout
//
// Log a user out of the service.
login.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = login;