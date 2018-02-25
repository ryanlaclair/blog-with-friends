const express = require('express'),
      auth    = require('../config/auth');

const user = express.Router({ mergeParams: true });

// GET /:username
//
// Redirect to the personal blog feed route for the given user.
user.get('/', (req, res) => {
  res.redirect('/' + req.params.username + '/blogs');
});

// GET /:username/blogs
//
// Render the feed view with the all of the personal blog posts for the
// given user.
user.get('/blogs', (req, res) => {
  res.render('feed', {
    username: req.user.username
  });
});

// POST /:username/blogs
//
// Add a new blog post to the logged in users personal blog feed.
user.post('/blogs', auth.verifyUser, (req, res) => {
  
});

module.exports = user;