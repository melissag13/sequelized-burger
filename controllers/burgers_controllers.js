// Here is where you create all the functions that will do the routing for your app, and the logic of each route.
var express = require('express');
var router = express.Router();
var burger = require('../models/')['burger.js'];
var moment = require('moment');
//get route -> index
router.get('/', function(req,res) {
		res.redirect('/burgers')
});

// router.get('/burgers', function(req,res) {
// 	//express callback response by calling burger.selectAllBurger
// 	burger.all(function(burger_data){
// 		//wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
// 		res.render('index', {burger_data});
// 	});
// });
router.get('/burgers', function(req, res) {
    burger.findAll()
    .then(function(burger_data) {
        console.log(burger_data);
        return res.render('index', {burger_data})
    });
});
//post route -> back to index
// router.post('/burgers/create', function(req, res) {
// 	//takes the request object using it as input for buger.addBurger
// 	burger.create(req.body.burger_name, function(result){
// 		//wrapper for orm.js that using MySQL insert callback will return a log to console, render back to index with handle
// 		console.log(result);
// 		res.redirect('/');
// 	});
// });

// //put route -> back to index
// router.put('/burgers/update', function(req,res){
// 	burger.update(req.body.burger_id, function(result){
// 		//wrapper for orm.js that using MySQL update callback will return a log to console, render back to index with handle
// 		console.log(result);
// 		res.redirect('/');
// 	});
// });

router.post('/burgers/create', function(req, res) {
    burger.create({burger_name: req.body.burger_name})
    .then(function(newBurger){
        console.log(newBurger);
        res.redirect('/');
    });    
});

 burger.findOne({where:{id: req.body.burger_id}})
    .then(function(devourBurger) {
        return devourBurger.updateAttributes({
            devoured: true
        }).then(function() {
            res.redirect('/burgers');    
        })
    });


module.exports = router;
