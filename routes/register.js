var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var db = require('../models/database');
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');


router.get('/', function(req, res) {
  res.render('register', {title: 'Register'})
});


router.post('/register', function (req, res) {
	db.user.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	}).then(function () {
		res.redirect('/login')
	})
})


module.exports = router;