var express = require('express');
var router = express.Router();

/* GET Admin Home Page. */
router.get('/', function(req, res, next) {
  res.render('admin-orders', { title: 'Your Admin Orders' });
});

module.exports = router;
