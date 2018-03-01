// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const express   = require('express'),
      mongoose  = require('mongoose'),
      jsontoxml = require('jsontoxml'),
      User      = require('../models/user'),
      Blog      = require('../models/blog');

const api = express.Router({ mergeParams: true });

// GET /api/users
//
// Get the complete list of application users
api.get('/users', (req, res) => {
  User
    .find({ })
    .populate('friends')
    .exec((err, users) => {
      let userArray = users.map((user) => {
        return {
          user: {
            username: user.username,
            id: user._id,
          }
        }
      });

      res.format({
        'application/json': () => {
          res.json({ users: userArray });
        },
        'application/xml': () => {
          res.type('application/xml');
          res.send(jsontoxml(JSON.stringify({ users: userArray })));
        },
        'default': () => {
          res.status(404);
          res.send("<b>404 - Not Found</b>");
        }
      });
    });
});

// GET /api/users/:user
//
// Get the information for the given user.
api.get('/users/:user', (req, res) => {
  User
    .findOne({ _id: req.params.user })
    .populate('friends')
    .exec((err, user) => {
      let userResponse = {
        username: user.username,
        name: {
          first: user.name.first,
          last: user.name.last
        },
        id: user._id,
        email: user.email,
        friends: []
      };

      let friends = user.friends.map((friend) => {
        return {
          username: friend.username,
          id: friend._id
        }
      });

      userResponse.friends = friends;

      res.format({
        'application/json': () => {
          res.json(userResponse);
        },
        'application/xml': () => {
          res.type('application/xml');
          res.send(jsontoxml(JSON.stringify(userResponse)));
        },
        'default': () => {
          res.status(404);
          res.send("<b>404 - Not Found</b>");
        }
      });
    });
});

// GET api/:user/blogs
//
// Get the list of blogs for the given user.
api.get('/users/:user/blogs', (req, res) => {
  Blog
    .find({ author: req.params.user })
    .populate('author')
    .exec((err, blogs) => {
      let blogArray = blogs.map((blog) => {
        let keywords = blog.keywords.map((keyword) => {
          return keyword;
        });

        return {
          title: blog.title,
          body: blog.body,
          date: blog.date,
          keywords: keywords
        }
      });

      res.format({
        'application/json': () => {
          res.json({ blogs: blogArray });
        },
        'application/xml': () => {
          res.type('application/xml');
          res.send(jsontoxml(JSON.stringify({ blogs: blogArray })));
        },
        'default': () => {
          res.status(404);
          res.send("<b>404 - Not Found</b>");
        }
      });
    });
});

module.exports = api;