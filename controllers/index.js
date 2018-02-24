const express    = require('express'),
      passport   = require('passport'),
      login      = require('./login'),
      feed       = require('./feed'),
      search     = require('./search'),
      user       = require('./user'),
      blog       = require('./blog'),
      verifyAuth = require('../config/auth').verifyAuth;

const router = express.Router();

router.use('/', login);
router.use('/feed', verifyAuth, feed);
router.use('/search', verifyAuth, search);
router.use('/:username', verifyAuth, user);
router.use('/:username/blogs', verifyAuth, blog);

router.use((req, res) => {
  res.status(404);
  res.send('404');
});

module.exports = router;