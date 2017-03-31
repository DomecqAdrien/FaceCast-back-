var express = require('express');
var router = express.Router();

/* GET users listing. */
/* Liste des utilisateurs */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('users/show', {
        "title" : "Liste des utilisateurs",
        "userlist" : docs
        });
    });
});

/* GET users listing. */
/* Liste des utilisateurs */
router.get('/showjson', function(req, res, next) {
    var db = req.db;
    var collection = db.get('usercollection');
    
    collection.find({},{},function(e,docs){

        var obj = "'collections': [";
        var i = Object.keys(docs).length -1;
        console.log(i);
        Object.keys(docs).map(function(user, index) {
            obj += "{'prenom': " + docs[user].prenom + ", 'nom': "+ docs[user].nom + ", 'email': " + docs[user].email + " }" ;
            if(index != i){
                obj += ",";
            }
        });
        obj += "]";
        res.render('users/showjson', {
        "title" : "Liste des utilisateurs",
        "userlist" : obj
        });
    });
});

router.get('/add', function(req, res, next){

     res.render('users/insert', {
        "title" : "Liste des utilisateurs"
        })

})

router.post('/add', function(req, res){
    var db = req.db;

    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var email = req.body.email;
    var password = req.body.password;

    var collection = db.get('usercollection');
    collection.insert({
        "nom" : nom,
        "prenom": prenom,
        "email": email,
        "password" : password
    }, function (err, doc) {
        if(err) {
            res.send("Error");
        } else {
            res.redirect("/users");
        }
    });
});

router.get('/addtestdata', function(req, res){
    var db = req.db;

    var collection = db.get('usercollection');

    collection.insert({

    })
})

module.exports = router;