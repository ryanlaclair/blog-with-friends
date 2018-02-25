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
router.use('/:username', auth.verifyAuth, user);
router.use('/:username/blogs', auth.verifyAuth, auth.verifyUser, blog);

router.use((req, res) => {
  res.status(404);
  res.send('404');
});

module.exports = router;