"use strict"

var express = require('express'); var router = express.Router(); 
var produceArray = [];
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
    var db = req.db;
    db.each("SELECT name, description FROM produce", function(err, row){
        produceArray.push({ name: row.name, description: row.description });
    });
    console.log(produceArray);
    res.render('produce_list', {
        title: "Produce List",  data: produceArray
    });
});

module.exports = router;
