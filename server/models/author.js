const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// No id required as mongo handles generating them
const authorSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Author', authorSchema);
