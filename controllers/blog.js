const express = require('express')
      Blog    = require('../models/blog');

const blog = express.Router({ mergeParams: true });

// GET /:username/blogs/new
//
// Render the edit view so that the user can create a new blog post.
blog.get('/new', (req, res) => {
  res.render('edit', {
    username: req.user.username,
    form: {
      action: '/' + req.params.username + '/blogs',
      method: 'post'
    }
  });
});

// GET /:username/blogs/:id
//
// Render the blog view to show a single blog post of the given id.
blog.get('/:id', (req, res) => {
  res.render('blog');
});

// PUT /:username/blogs/:id
//
// Update a blog post with the given id.
blog.put('/:id', (req, res) => {
  // update blog
});

// DELETE /:username/blogs/:id
//
// Remove a blog post with the given id.
blog.delete('/:id', (req, res) => {
  Blog.remove({ _id: req.params.id }, (err) => {
    res.redirect('/' + req.params.username + '/blogs');
  });
});

// GET /:username/blogs/:id/edit
blog.get('/:id/edit', (req, res) => {
  res.render('edit', {
    username: req.user.username,
    form: {
      action: '/' + req.params.username + '/blogs' + req.params.id,
      method: 'put'
    }
  });
});

module.exports = blog;