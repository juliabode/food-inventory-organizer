var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products.js');
const url = process.env.MONGODB_URI;

mongoose.connect(url, {useNewUrlParser: true});

/* GET users listing. */
router.get('/', function(req, res, next) {
  Product.find({}).then(eachOne => {
    res.json(eachOne);
  })
});

module.exports = router;
