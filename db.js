var mongoose = require('mongoose'), Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/facecast', function(err) {
  if (err) { throw err; }
});


var figurantSchema = new mongoose.Schema({
  nom : String,
  prenom : String,
  email : String,
  password : String,
});

var candidatureSchema = new mongoose.Schema({
  figurant : { type: mongoose.Schema.ObjectId, ref : 'monFigurant'},
  evenement : { type : mongoose.Schema.ObjectId, ref : 'monEvenement'},
  etat : String
});

var evenementSchema = new mongoose.Schema({
  nom : String,
  type : String,
  date_debut : { type : Date, default : Date.now },
  date_fin : { type : Date, default : Date.now },
  nb_jours : Number
});

var evenementModel = mongoose.model('evenements', evenementSchema);
var figurantModel = mongoose.model('figurants', figurantSchema);
var candidatureModel = mongoose.model('candidatures', candidatureSchema);

var monFigurant = new figurantModel({
  nom: 'Nom Test', 
  prenom : "prenom Test", 
  email : "test@test.test", 
  password : "test"
});
var monEvenement = new evenementModel({ 
	nom : 'Evenement Test', 
	type : "film", 
	date_debut : "01/01/01",
  date_fin : "02/02/02", 
	nb_jours : 5, 
	figurants : monFigurant
	
});

var maCandidature = new candidatureModel({
  figurant : monFigurant,
  evenement : monEvenement,
  etat : 'En attente'
});

var maCandidature2 = new candidatureModel({
  figurant : monFigurant,
  evenement : monEvenement,
  etat : 'En attente'
});

maCandidature.save(function (err) {
  if (err) { throw err; }
  console.log('Candidature ajoutée avec succès !');
});

maCandidature2.save(function (err) {
  if (err) { throw err; }
  console.log('Candidature ajoutée avec succès !');
});

monFigurant.save(function (err) {
  if (err) { throw err; }
  console.log('Figurant ajouté avec succès !');
});

monEvenement.save(function (err) {
  if (err) { throw err; }
  console.log('Commentaire ajouté avec succès !');
});

mongoose.connection.close();