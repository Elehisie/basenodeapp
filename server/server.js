//Base Node system for a simple html5 server with json web token authentication
//Developed by Camila Paschini for PurpleRain
//Contact me at camila@purplerain.com.br

//This is a working system, but it's meant to be a skeleton, a starting point
//This was put together by me using info from the node and angular knowedge bases and documentation,
//as well as info from various tutorials, including but not limited to scoth.io, egghead.io

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var jwt = require('jsonwebtoken');

var db = mongoose.connect('mongodb://localhost/dbnamegoeshere');

var upload = multer();

var authRoutes = require('./routes/auth.js');

var PORT = 3000;
var app = express();

app.use(bodyParser.json()); //parses json
app.use(bodyParser.urlencoded({ extended: true })); //urlencoded data

app.use(passport.initialize());


app.use(morgan('dev'));

app.use('/auth', authRoutes);

app.use(express.static(__dirname + '../../ngClient')); //public files

app.listen(PORT);
console.log('Magic happening at port: ' +  PORT);
