const express = require('express'),
      auth    = require('../config/auth')
      Blog    = require('../models/blog');

const user = express.Router({ mergeParams: true });

// GET /:username
//
// Redirect to the personal blog feed route for the given user.
user.get('/', (req, res) => {
  res.redirect('/' + req.params.username + '/blogs');
});

// GET /:username/blogs
//
// Render the personal feed view with the all of the personal blog posts for 
// the given user.
user.get('/blogs', (req, res) => {
  let blog = Blog
    .find({ author: req.user._id })
    .populate('author');
  
  blog.exec((err, blogs) => {
    if (!err) {
      res.render('feed', {
        personal: true,
        username: req.user.username,
        blogs: blogs
      });
    }
  });
});

// POST /:username/blogs
//
// Add a new blog post to the logged in users personal blog feed.
user.post('/blogs', auth.verifyUser, (req, res) => {
  let keywordList = req.body.keywords.split(/[ ,]+/);

  Blog.create({
    author: req.user._id,
    title: req.body.title,
    body: req.body.body,
    keywords: keywordList
  }, (err, blog) => {
    res.redirect('/blogs');
  });
});

module.exports = user;