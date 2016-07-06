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
		db.recipe.category.findAll().then(function(categories){
			var allCategories = db.recipe.category.map(function(category){
				return {
					category: db.recipe.category
				}
			})
		})
	}
  res.render('categories', {title: 'Categories'})
});





module.exports = router;