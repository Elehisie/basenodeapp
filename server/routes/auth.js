var express = require('express');
var passport = require('passport');
var jwt = require('express-jwt');

var passportConfig = require('../config/passport');
var User = require('../models/users');
var auth = jwt({secret: 'supersecretgoeshere', userProperty: 'payload'});

var router = express.Router();

router.post('/login',function(req,res,next) { //not protected
  //this is a custom callback function, which allows to read from the info object
  passport.authenticate('local',{session:false},function(err,user,info) {
    if (err) { return next(err) }
    if (!user) {
      //see what the error was
      return res.json(info);
    } else {
        console.log(user);
        req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json({
          success: true,
          token: user.generateJWT()
        });
      });
    }
  })(req, res, next);

});

router.post('/register',function(req,res) { //not protected
  //create new user
  var newUser = new User(req.body);
    User.findOne({ username: req.body.username }, function(err, user) {
      if (user) {
        res.json({ success: false, message: 'The username you picked is already taken.' });
      } else {
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.nickname = req.body.nickname;
        newUser.username = req.body.username;
        newUser.password = newUser.setPassword(req.body.password);
        newUser.roles = req.body.roles;

        newUser.save(function(err, user) {
        if (err) return next(err);
        return res.json({
          success: true,
          message: 'New User created: '+user.name+' with username: '+user.username
          });
        });
      }
    });
});

router.post('/delete',auth,function(req,res) { //protected by jwt
  User.findOneAndRemove({ username: req.body.username }, function(err, user, result) {
    if (!err) {
      console.log('deleted this: '+user);
      console.log('this is the result: '+result);
      res.json({
        deleted: user,
        message: result
      });
    } else {
      console.log(err);
      res.json({ message: err });
    }
  });
});

router.get('/users',auth,function(req,res,next) { //protected by jwt
  User.find(function(err, users){
    if (err) { return next(err); }
    res.json({ users });
  });
});

router.param('user', function(req,res,next,id){
  //every time theres a :user param, this will be run first.
  //:user should contain an _id.
  var query = User.findById(id);
  query.exec(function (err, user) {
    if (err) { return next(err); }
    if (!user) { return next(req.json({
      success: false,
      message: 'User not found'
    })); }

    req.success = true;
    req.user = user;
    return next();
  });
});

router.get('/users/:user',auth,function(req,res,next) {
  User.findById(req.params.user, function(err,user) {
    if (err) { return next(err); }

    res.json({
      success: true,
      user: user
    });
  });
});

router.get('/loggedIn', function(req,res) {
  res.send(req.isAuthenticated() ? req.user:false );
});

//use this to add a user directly
// router.get('/setup', function(req,res) {
//   var addUser = new User({
//     "name" : "User Lastname",
//     "username" : "username",
//     "password" : "password",
//     "roles" : [
//         "member",
//         "guest"
//     ]
//   });

//   addUser.save(function(err){
//     if (err) throw err;
//     console.log('Sample User saved!');
//     res.json({ success: true });
//   });
// });

module.exports = router;
