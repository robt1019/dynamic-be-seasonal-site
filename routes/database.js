
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
            res.json(produce);
        }
    });

});

// GET months list page.
router.get('/months_list', function(req, res){

    var db = req.db;

    db.all("SELECT id, name, produce_id FROM months", function(err, months){
        if(err !== null){
            console.log(err);
        }
        else{
            res.json(months);
        }
    });

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

// Post to add produce service
router.post('/add_to_month', function(req, res){

    var db = req.db;
    var monthProduceArray = [];

    // Get form values
    var monthName = req.body.month_name;
    var produceNames = req.body.produce_names;
    monthProduceArray = produceNames.split(',');
    console.log(monthProduceArray);

    // Insert produce into months database by month
    for (var i = 0; i < monthProduceArray.length; i++) {

        var produceName = monthProduceArray[i];
        console.log(produceName);
        var statement, produceId;

        db.all("SELECT id FROM produce WHERE name = ?", (produceName), function(err, produce_id){
            // Check for error
            if(err !== null){
                console.log(err);
            }
            else{
                // Get produce id from SELECT statement above
                produceId = produce_id[0].id;
                console.log(produceId);
                // Insert into DB safely using prepare syntax
                var statement = db.prepare("INSERT INTO  months(name, produce_id) VALUES (?, ?)");
                statement.run(monthName, produceId);
                statement.finalize();
            }
        });
    };
    // Return to produce list page after inserting item
    res.location("produce_admin");
    res.redirect("produce_admin");

});

module.exports = router;