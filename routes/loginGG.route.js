




var cookieSession = require('cookie-session')

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
var userModel = require('../models/user.model');
// const User = require('../models/usersgg.model');
var Schema = mongoose.Schema;
var Users = new Schema({
  googleId: String,
       bugColour: String,
       name: String
 });
 var User = mongoose.model("User", Users);
// var User = mongoose.model('users');
const keys = require('../key');

mongoose.connect(keys.mongoURI,()=>{
  useNewUrlParser: true
  console.log("dong y ket noi")
}
);

// const User = require('../models/usersgg.model');
// const User = require('../models/usersgg.model');


var express = require('express');
const router = express.Router();


var FACEBOOK_APP_ID = '567133899872-rv36dehvo8trtaj00h1vlg7inchnldp4.apps.googleusercontent.com',
    FACEBOOK_APP_SECRET ='wg5ohvOvTIvbQTp8bDalZ3KK';
//  var cb =  function(accessToken, refreshToken, profile, cb) {
//   console.log(profile);
//   };
var fbOpts = {
    callbackURL:'http://localhost:3000/google/auth/google/redirect',
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    
}
passport.use(new GoogleStrategy(fbOpts,(accessToken, refreshToken, profile, cb) => { 
  if (profile.id) {
     console.log(profile);
    // //  console.log(profile.email);
    //  console.log(profile.displayName);
    var entity = {
      
     
      // email: profile.email,
      Username: profile.displayName,
    }
    userModel.add(entity).then((user) => {
      console.log("complete");
      
      return cb(user);
    })
      
    
    

    
    
 
 

}}))


 
 



router.get('/',passport.authenticate('google', {scope:['profile']}));



router.get('/auth/google/redirect', passport.authenticate('google'), (req, res ,next)=>{
  console.log(req.user)
  res.redirect('/');
  
}

);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

router.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
router.use(passport.initialize());
router.use(passport.session());

  
 
 
 module.exports = router;