// "use strict"

// var express = require('express');
// var router = express.Router();

// // Post to add produce service
// router.post('/add_produce', function(req, res){

//     var db = req.db;

//     // Get form values
//     var produceName = req.body.name;
//     var produceDescription = req.body.description;
//     var imageFile = req.body.imageFile;

//     // Insert into DB
//     var statement = db.prepare("INSERT INTO  produce VALUES (?, ?, ?)");
//     statement.run(produceName, produceDescription, imageFile);
//     statement.finalize();

// });

// module.exports = router;