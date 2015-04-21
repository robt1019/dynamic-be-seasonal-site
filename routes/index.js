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

module.exports = router;
