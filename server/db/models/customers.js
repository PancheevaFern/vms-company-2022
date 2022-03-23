// File: ./models/products.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  code: String,
  name: String,
  ppu: Number,
  qty: Number,
  date: {type: Date, default: Date.now}
});

//Export function to create "ProductSchema" model class
module.exports = mongoose.model('Customers', CustomerSchema);