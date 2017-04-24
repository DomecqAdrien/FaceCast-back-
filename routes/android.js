var express = require('express');
var router = express.Router();
var Evenement = require('../models/evenement');
var User = require('../models/figurant');
var Candidature = require('../models/candidature');

router.get('/evenements/:id?', function(req, res, next){
    var response = {};

    Evenement.find({}, function(err, data){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {data};
        }
        res.json(response);
    });
});

router.get('/candidatures/:id?', function(req, res, next){
    var response = {};



    Candidature
    .find({ 'figurant' : req.params.id })
    .populate('figurant')
    .populate('evenement')
    .exec(function(err, story){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {story};
        }
        res.json(response);
    });
});

router.post('/candidatures', function(req, res, next){
    var response = {};

    Candidature
    .find({ 'figurant' : req.body.id })
    .populate('figurant')
    .populate('evenement')
    .exec(function(err, story){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {story};
        }
        res.json(response);
    });
});

router.post('/login', function(req, res){

    var email = req.body.email;
    var password = req.body.password;
    
    User.findOne({password: password, email: email}, function(e, docs){
        res.send(docs);
    });


});

router.get('/login/:email/:password', function(req, res){

    var email = req.params.email;
    var password = req.params.password;

    User.findOne({password: password, email: email}, function(e, docs){
        res.send(docs);
    });
});

router.get('/candidatures/:idEvenement/:idFigurant/:idRole', function(req, res){

    var idFigurant = req.params.idFigurant;
    var idEvenement = req.params.idEvenement;
    var idRole = req.params.idRole;

    var newCandidature = new Candidature({
        "evenement" : idEvenement,
        "figurant": idFigurant,
        "role": idRole
    });

    newCandidature.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send(err);
        }
        else {
            // Redirection vers la liste
            res.send("success");
        }
    });
    
})

router.put('/candidatures/edit/:idCandidature/:etat', function(req, res){

    var idCandidature = req.params.idCandidature;
    var etat = req.params.etat;

    Candidature.findById(idCandidature, function(err, candidature){
        if(err) return handleError(err);

        candidature.etat = etat;

        candidature.save(function(err, updatedCandidature){
            if(err) return handleError(err);
            res.send("success");
        });
    });
});

module.exports = router;