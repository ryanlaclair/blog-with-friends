const express = require('express'),
      auth    = require('../config/auth'),
      Blog    = require('../models/blog');

const blog = express.Router({ mergeParams: true });

// GET /:user/blogs
//
// Render the personal feed view with the all of the personal blog posts for 
// the given user.
blog.get('/', (req, res) => {
  let blogDocument = Blog
    .find({ author: req.user._id })
    .populate('author');
  
  blogDocument.exec((err, blogs) => {
    if (!err) {
      res.render('feed', {
        personal: true,
        user: req.user,
        blogs: blogs
      });
    }
  });
});

// POST /:user/blogs
//
// Add a new blog post to the logged in users personal blog feed.
blog.post('/', auth.verifyUser, (req, res) => {
  let keywordList = req.body.keywords.split(/[ ,]+/);

  Blog.create({
    author: req.user._id,
    title: req.body.title,
    body: req.body.body,
    keywords: keywordList
  }, (err, blog) => {
    res.redirect('/' + req.params.user + '/blogs');
  });
});

// GET /:user/blogs/new
//
// Render the edit view so that the user can create a new blog post.
blog.get('/new', auth.verifyUser, (req, res) => {
  res.render('edit', {
    user: req.user,
    form: {
      action: '/' + req.params.user + '/blogs',
      method: 'post'
    }
  });
});

// GET /:user/blogs/:blog
//
// Render the blog view to show a single blog post of the given id.
blog.get('/:blog', (req, res) => {
  res.render('blog');
});

// PUT /:user/blogs/:blog
//
// Update a blog post with the given id.
blog.put('/:blog', auth.verifyUser, (req, res) => {
  // update blog
});

// DELETE /:user/blogs/:blog
//
// Remove a blog post with the given id.
blog.delete('/:id', auth.verifyUser, (req, res) => {
  Blog.remove({ _id: req.params.id }, (err) => {
    res.send({ redirect: '/' + req.params.user });
  });
});

// GET /:user/blogs/:id/edit
blog.get('/:id/edit', auth.verifyUser, (req, res) => {
  res.render('edit', {
    user: req.user,
    form: {
      action: '/' + req.params.user + '/blogs' + req.params.id,
      method: 'put'
    }
  });
});

module.exports = blog;