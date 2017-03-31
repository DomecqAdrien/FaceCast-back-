var express = require('express');
var router = express.Router();
var evenement = require('../models/evenement');
var user = require('../models/figurant');
var candidature = require('../models/candidature');

router.get('/evenements/:id?', function(req, res, next){
    var response = {};

    evenement.find({}, function(err, data){
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



    candidature
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

    candidature
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
    
    user.findOne({password: password, email: email}, function(e, docs){
        res.send(docs);
    });


});

router.get('/login/:email/:password', function(req, res){

    var email = req.params.email;
    var password = req.params.password;

    user.findOne({password: password, email: email}, function(e, docs){
        res.send(docs);
    });
});

router.get('/candidatures/:idEvenement/:idFigurant', function(req, res){

    var idFigurant = req.params.idFigurant;
    var idEvenement = req.params.idEvenement;
    console.log(idFigurant);
    console.log(idFigurant);


    var newCandidature = new candidature({
        "evenement" : idEvenement,
        "figurant": idFigurant
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

module.exports = router;