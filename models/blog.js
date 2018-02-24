const mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
  keywords: [String]
});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;