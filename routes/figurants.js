var express = require('express');
var router = express.Router();
var Figurant = require('../models/figurant')

/* GET users listing. */
/* Liste des utilisateurs */
router.get('/', function(req, res, next) {
    Figurant.find({}, {}, function(e, figurants){
        res.render('figurants/show', {
        "title" : "Liste des utilisateurs",
        "userlist" : figurants
        });
    })
});

router.get('/add', function(req, res, next){

     res.render('figurants/insert', {
        "title" : "Liste des utilisateurs"
        })

})

router.post('/add', function(req, res){

    var db = req.db;

    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var email = req.body.email;
    var password = req.body.password;

    var newFigurant = new Figurant({
        "nom" : nom,
        "prenom": prenom,
        "email": email,
        "password" : password
    });

    newFigurant.save(function(err, doc){
        if(err){
            res.send('error');
        }else{
            res.redirect("/figurants");
        }
    });
});

module.exports = router;