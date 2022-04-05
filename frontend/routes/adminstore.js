var express = require('express');
var router = express.Router();

/* GET Admin Home Page. */
router.get('/', function(req, res, next) {
  res.render('admin-store', { title: 'Your Store Settings' });
});

module.exports = router;
