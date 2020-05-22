const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: String,
  freezeDate: Number,
  mhd: Number,
  type: String,
  quantity: String,
  notes: String,
})

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
