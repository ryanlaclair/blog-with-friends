// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const mongoose = require('mongoose'),
      User     = require('./user');

// the schema for a blog post
let blogSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
  keywords: [String]
});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;