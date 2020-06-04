const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: String,
  freezeDate: Date,
  mhd: Date,
  type: String,
  quantity: String,
  freezerLocation: String,
  compartment: Number,
  notes: String
})

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
