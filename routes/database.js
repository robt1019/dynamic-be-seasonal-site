
var express = require('express');
var router = express.Router();


// GET produce admin page. 
router.get('/produce_admin', function(req, res, next) {
    res.render('produce_admin', { title: 'Produce Admin' });
});

// GET produce list page.
router.get('/produce_list', function(req, res){

    var db = req.db;

    db.all("SELECT id, name, description, image_url FROM produce", function(err, produce){
        if(err !== null){
            console.log(err);
        }
        else{
            console.log(produce);
            res.json(produce);
        }
    });
    
    // res.render('produce_list', {
    //     title: "Produce List",  data:'nope'
    // });
});

// Post to add produce service
router.post('/add_produce', function(req, res){

    var db = req.db;

    // Get form values
    var produceName = req.body.name;
    var produceDescription = req.body.description;
    var imageFile = req.body.imageFile;

    // Insert into DB safely using prepare syntax
    var statement = db.prepare("INSERT INTO  produce(name, description, image_url) VALUES (?, ?, ?)");
    statement.run(produceName, produceDescription, imageFile);
    statement.finalize();

    // Return to produce list page after inserting item
    res.location("produce_admin");
    res.redirect("produce_admin");

});

module.exports = router;