var express = require('express');
var router = express.Router();
var Evenement = require('../models/evenement');
var Candidature = require('../models/candidature');

router.get('/add', function(req, res, next){
    res.render('evenements/insert', {
        'title': 'Nouvel événement'
    });
});

router.post('/add', function(req, res){

    console.log(req.body);
    var nom = req.body.nom;
    var date_debut = req.body.date_debut;
    var date_fin = req.body.date_fin;
    var type = req.body.type;
    var nb_jours = req.body.nb_jours;
    var rolesPost = req.body.roles;
    var nbPersonnesRole = req.body.nbPersonnesRole

    if(Array.isArray(rolesPost)){
        var roles = [];
        for (var i = 0; i < req.body.roles.length; i++) {
            roles.push({"role" : rolesPost[i], "nbPersonnesRole" : nbPersonnesRole[i]})
        }
    }else{
        var roles = {"role" : rolesPost, "nbPersonnesRole": nbPersonnesRole };
    }
    
    console.log(roles);

    var newEvenement = new Evenement({
        "nom" : nom,
        "date_debut": date_debut,
        "date_fin": date_fin,
        "type": type,
        "nb_jours": nb_jours,
        "roles" : roles
    });

    newEvenement.save(function(err, doc){
        if(err){
            res.send('error');
        }else{
            res.redirect("/evenements/add");
        }
    });
});

router.get('/', function(req, res){
    Evenement.find({}, {}, function(e, docs){
        res.render('evenements/show', {
            evenements: docs
        });
    });
});

router.delete('/delete/:idEvenement', function(req, res){

    var idEvenement = req.params.idEvenement;

    Evenement.findById(idEvenement).remove().exec();

    Candidature.find({'evenement' : idEvenement}, function(err, candidatures){
        if(err) res.send(err);
        else {
            candidatures.forEach(function(candidature){
                console.log(candidature);
                candidature.etat = "terminé";
                candidature.save(function(err, updatedCandidature){
                    if(err) return handleError(err);
                });
            });
            res.redirect("/evenements")
        }
    });
});

module.exports = router;