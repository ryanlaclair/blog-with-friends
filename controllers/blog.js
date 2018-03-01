// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const express   = require('express'),
      mongoose  = require('mongoose'),
      passport  = require('passport'),
      jsontoxml = require('jsontoxml');
      auth      = require('../config/auth'),
      Blog      = require('../models/blog');

const blog = express.Router({ mergeParams: true });

// GET /:user/blogs
//
// Render the user blog feed view with the all of the personal blog posts for 
// the given user.
blog.get('/', (req, res) => {
  Blog
    .find({ author: req.params.user })
    .populate('author')
    .exec((err, blogs) => {
      if (!err) {
        let friends = req.user.friends.map((friend) => {
          return friend._id.toString();
        });

        res.render('user', {
          personal: (req.params.user == req.user._id),
          user: req.user,
          blogs: blogs,
          other: {
            id: req.params.user,
            friend: (friends.includes(req.params.user))
          }
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
    res.send({ redirect: '/' + req.params.user });
  });
});

// GET /:user/blogs/new
//
// Render the edit view so that the user can create a new blog post.
blog.get('/new', auth.verifyUser, (req, res) => {
  res.render('edit', {
    user: req.user
  });
});

// GET /:user/blogs/:id
//
// Render the blog view to show a single blog post of the given id.
blog.get('/:id', (req, res) => {
  Blog
    .findOne({ _id: req.params.id })
    .populate('author')
    .exec((err, blog) => {
      res.render('blog', {
        personal: (req.params.user == req.user._id),
        user: req.user,
        blog: blog
      });
    });
});

// PUT /:user/blogs/:id
//
// Update a blog post with the given id.
blog.put('/:id', auth.verifyUser, (req, res) => {
  let keywordList = req.body.keywords.split(/[ ,]+/);

  Blog.findOne({ _id: req.params.id }, (err, blog) => {
    blog.title = req.body.title;
    blog.body = req.body.body;
    blog.keywords = keywordList;

    blog.save((err, newBlog) => {
      res.send({ redirect: '/' + req.params.user });
    });
  });
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
//
// Render the edit view for an existing blog post.
blog.get('/:id/edit', auth.verifyUser, (req, res) => {
  Blog.findOne({ _id: req.params.id }, (err, blog) => {
    res.render('edit', {
      user: req.user,
      blog: {
        title: blog.title,
        body: blog.body,
        keywords: blog.keywords,
        id: blog._id
      }
    });
  });
});

module.exports = blog;