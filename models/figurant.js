var mongoose = require('mongoose');

var figurantSchema = new mongoose.Schema({
  nom : String,
  prenom : String,
  email : String,
  password : String,
});

module.exports = mongoose.model('figurants', figurantSchema, 'figurants');