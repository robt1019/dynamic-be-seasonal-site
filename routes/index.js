"use strict"

var express = require('express');
var router = express.Router(); 

// GET produce checker page. 
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Product Checker' });
});

// GET home page. 
router.get('/home', function(req, res, next) {
    res.render('home', { title: 'Home' });
});

// GET produce admin page. 
router.get('/produce_admin', function(req, res, next) {
    res.render('produce_admin', { title: 'Produce Admin' });
});

// GET produce list page.
router.get('/produce_list', function(req, res){
    var produceArray = req.produceArray;
    console.log("produce array: " + produceArray);
    res.render('produce_list', {
        title: "Produce List",  data: produceArray
    });
});

// Post to add produce service
router.post('/add_produce', function(req, res){

    var db = req.db;

    // Get form values
    var produceName = req.body.name;
    var produceDescription = req.body.description;
    var imageFile = req.body.imageFile;

    // Insert into DB
    var statement = db.prepare("INSERT INTO  produce VALUES (?, ?, ?)");
    statement.run(produceName, produceDescription, imageFile);
    statement.finalize();

    console.log("Image file: " + imageFile);

    // Return to produce list page after inserting item
    res.location("produce_admin");
    res.redirect("produce_admin");

});

module.exports = router;
