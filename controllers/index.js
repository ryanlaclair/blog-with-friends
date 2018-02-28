// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

const express    = require('express'),
      passport   = require('passport'),
      login      = require('./login'),
      feed       = require('./feed'),
      search     = require('./search'),
      user       = require('./user'),
      blog       = require('./blog'),
      auth       = require('../config/auth');

const router = express.Router();

router.use('/', login);
router.use('/feed', auth.verifyAuth, feed);
router.use('/search', auth.verifyAuth, search);
router.use('/:user', auth.verifyAuth, user);
router.use('/:user/blogs', auth.verifyAuth, blog);

router.use((req, res) => {
  res.status(404);
  res.send('404');
});

module.exports = router;