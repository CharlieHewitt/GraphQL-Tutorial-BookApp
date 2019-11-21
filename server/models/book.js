const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// No id required as mongo handles generating them
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model('Book', bookSchema);
