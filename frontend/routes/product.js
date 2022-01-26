var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/product/:id', function(req, res, next) {
  console.log(req.params)
  res.render('product', { title: 'Product', output : req.params.id });
});

module.exports = router;
