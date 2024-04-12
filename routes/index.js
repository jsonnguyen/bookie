const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.user
  res.render('index', { title: 'Bookview', user, img: '../images/custom-terraria-logo.png', alt: 'Welcome to Bookview' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/');
  });
});

module.exports = router;
