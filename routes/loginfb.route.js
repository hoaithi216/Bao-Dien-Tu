

var express = require('express');
const router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

var FACEBOOK_APP_ID = '356699565049572',
 FACEBOOK_APP_SECRET ='28b60b1df2d3835db7c95ab02c01a922';
 var cb =  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        console.log(user);
      return cb(err, user);
    });
  };
var fbOpts = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}
passport.use(new FacebookStrategy(fbOpts,cb));


router.get('/',
  passport.authenticate('facebook'));


//  router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
  router.get('/auth/facebook/callback', (req, res, next)=>{
    res.end('everything will be oke');
  })
  
 
 
 module.exports = router;