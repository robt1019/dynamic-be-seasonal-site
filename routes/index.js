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

module.exports = router;
