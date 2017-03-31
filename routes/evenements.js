var express = require('express');
var router = express.Router();
var evenement = require('../models/evenement');

router.get('/add', function(req, res, next){
    res.render('evenements/insert', {
        'title': 'Nouvel événement'
    });
});

router.post('/add', function(req, res){
    var db = req.db;

    var nom = req.body.nom;
    var date_debut = req.body.date_debut;
    var date_fin = req.body.date_fin;
    var type = req.body.type;
    var nb_jours = req.body.nb_jours;

    var newEvenement = new evenement({
        "nom" : nom,
        "date_debut": date_debut,
        "date_fin": date_fin,
        "type": type,
        "nb_jours": nb_jours
    });

    newEvenement.save(function(err, doc){
        if(err){
            res.send('error');
        }else{
            res.redirect("/evenements");
        }
    });

    /*var collection = db.get('evenements');
    collection.insert({
        "nom" : nom,
        "date_debut": date_debut,
        "date_fin": date_fin,
        "type" : type,
        "nb_jours": nb_jours
    }, function (err, doc) {
        if(err) {
            res.send("Error");
        } else {
            res.redirect("/users");
        }
    });*/
});

module.exports = router;