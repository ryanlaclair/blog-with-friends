const express  = require('express'),
      passport = require('passport'),
      flash    = require('connect-flash'),
      User     = require('../models/user');

const login = express.Router();

login.get('/', (req, res) => {
  res.redirect('/login');
});

login.get('/register', (req, res) => {
  res.render('register', {
    message: req.flash('error')
  });
});

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

login.get('/login', (req, res) => {
  res.render('login', {
    message: req.flash('error')
  });
});

login.post('/login', passport.authenticate('local', {
  successRedirect: '/feed',
  failureRedirect: '/login',
  failureFlash: 'Invalid login, please try again'
}));

login.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = login;