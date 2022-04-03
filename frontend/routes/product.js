var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/product/:barcode', function(req, res, next) {
  //console.log(req.params)
  res.render('product', { title: 'Product', output : req.params.barcode });
});

module.exports = router;
