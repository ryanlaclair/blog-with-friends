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
      api        = require('./api'),
      auth       = require('../config/auth');

const router = express.Router();

router.use('/api', api);
router.use('/', login);
router.use('/feed', auth.verifyAuth, feed);
router.use('/search', auth.verifyAuth, search);
router.use('/:user', auth.verifyAuth, user);
router.use('/:user/blogs', auth.verifyAuth, blog);

router.use((req, res) => {
  res.status(404);
  res.send("<b>404 - Not Found</b>");
});

module.exports = router;