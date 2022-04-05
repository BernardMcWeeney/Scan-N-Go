var express = require('express');
var router = express.Router();

/* GET Admin Home Page. */
router.get('/', function(req, res, next) {
  res.render('admin-profile', { title: 'Your Profile Settings' });
});

module.exports = router;
