var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/users');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      console.log('i got there see');
      if (err) { return done(err); }
      if (!user) {
        console.log('aha');
        return done(null, false,{
          success: false,
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
      // if(user.password !== password) {
//        console.log('hmmmmmmmmmmmmmm');
        return done(null,false,{
          success: false,
          message: 'Incorrect password.'
         });
      }
      return done(null, user);
    });
  }
));
