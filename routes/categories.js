var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var db = require('../models/database');
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');


router.get('/', (req, res) => {
	var user = req.session.user;
	if (user === undefined) {
		res.redirect('/?message=' + encodeURIComponent("Please log in."));
	} else {
		db.category.findAll().then(function(categories) {
			// console.log("ahdhasdhasdhashdashdahsdhashdashdhashh")
			var allCategories = categories.map(function(category) {
				// console.log("@&%E*^DUYTAGJKNANOD)(@E(*DUHA()*Y)(A*DS)(AS")
				// console.log(category.dataValues)
				return {
					name: category.dataValues.name,
					img: category.dataValues.img
						// img: db.category.img
				}
			})
			Catjes = allCategories;
			res.render('categories', {
				title: 'Categories',
				allCategories: Catjes
			})
		})
	}

});



module.exports = router;