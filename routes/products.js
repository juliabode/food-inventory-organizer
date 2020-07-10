var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products.js');
const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

/* GET Products listing. */
router.get('/', function (req, res, next) {
  Product.find({}).then((eachOne) => {
    res.json(eachOne);
  });
});

/* SET Products listing. */
router.post('/', function (req, res) {
  Product.create({
    name: req.body.name,
    freezeDate: req.body.freezeDate,
    mhd: req.body.mhd,
    type: req.body.type,
    quantity: req.body.quantity,
    freezerLocation: req.body.freezerLocation,
    compartment: req.body.compartment,
    notes: req.body.notes,
  }).then((product) => {
    res.json(product);
  });
});

/* REMOVE product */
router.delete('/delete', function (req, res) {
  Product.deleteOne({
    _id: req.body._id,
  }).then(res.send('product removed'));
});

/* Update product */
router.post('/update', function (req, res) {
  Product.findByIdAndUpdate(
    {
      _id: req.body._id,
    },
    {
      name: req.body.name,
      freezeDate: req.body.freezeDate,
      mhd: req.body.mhd,
      type: req.body.type,
      quantity: req.body.quantity,
      freezerLocation: req.body.freezerLocation,
      compartment: req.body.compartment,
      notes: req.body.notes,
    }
  ).then(res.send('product removed'));
});

module.exports = router;
