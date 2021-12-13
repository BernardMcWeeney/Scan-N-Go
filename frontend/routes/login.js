var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login/:logout', function(req, res, next) {
  console.log(req.params)
  res.render('login', { title: 'Login' , didLogOut : req.params.logout});
});

module.exports = router;
