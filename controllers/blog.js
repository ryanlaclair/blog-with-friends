const express = require('express');

const blog = express.Router({ mergeParams: true });

blog.get('/new', (req, res) => {
  res.send('GET /:username/blogs/new');
});

blog.get('/:id', (req, res) => {
  res.send('GET /:username/blogs/:id');
});

blog.put('/:id', (req, res) => {
  res.send('PUT /:username/blogs/:id');
});

blog.delete('/:id', (req, res) => {
  res.send('DELETE /:username/blogs/:id');
});

blog.get('/:id/edit', (req, res) => {
  res.send('GET /:username/blogs/:id/edit');
});

module.exports = blog;