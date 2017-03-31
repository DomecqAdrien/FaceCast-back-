var mongoose = require('mongoose');


var evenementSchema = new mongoose.Schema({
  nom : String,
  type : String,
  date_debut : { type : Date, default : Date.now },
  date_fin : { type : Date, default : Date.now },
  nb_jours : Number
});


module.exports = mongoose.model('evenements', evenementSchema, 'evenements');