var express = require('express');
var router = express.Router();

img_url = 'https://picsum.photos/200'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'CPAN 212 Pug',
    name: 'John',
    loggedIn: true,
    img_url: img_url,
  });
});

router.get('/attributes', function(req, res, next) {
  res.render('attributes', {
    img_url: img_url
  });
});

router.get('/loops', function(req, res, next) {
  res.render('loops', { 
    places: ["France", "Spain", "Netherlands"],
    grades: {
      'Math': 75,
      "Science": 85,
      "Art": 90
    },
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/conditionals', function(req, res, next) {
  res.render('conditionals', { 
    loggedIn: false,
    lastLogin: Math.floor(Math.random() * 120) + 1
  });
});

module.exports = router;
