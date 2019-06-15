var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var userModel = require('../models/user.model');
var passport = require('passport');
var auth = require('../middlewares/auth');



var router = express.Router();
router.get("/is-available", (req,res,next) => {
 
    var user1 = req.query.username;
    userModel.singleByUserName(user1).then(rows => {
        if(rows.length > 0){
            res.end("false");
        }
        res.end("true");
    })
})

router.get("/register", (req,res,next)=> {
    res.render('vwAccount/register',{layout:'baseview-writer.hbs'});


router.post('/register', (req,res,next)=>{
    var saltRounds=10;
    var hash = bcrypt.hashSync(req.body.password,saltRounds);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var entity = {
        Username: req.body.username,
        Password: hash,
        FristName:req.body.FristName,   
        LastName:req.body.LastName,
        Email:req.body.email,
        NickName:req.body.NickName,
        DOB :dob,   
        Permission:0,
      

    }
    userModel.add(entity).then(id=>{
        
        res.redirect('/account/login');
    })
})



})

router.get("/login" , (req,res,next)=> {
    res.render('vwAccount/login', {layout:false});
})

router.post('/login',(req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('vwAccount/login', {
        layout: false,
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err)
        return next(err);
        
        
      return res.redirect('/');
      
    });
  })(req, res, next);
})
  
router.get('/profile', auth, (req, res, next) => {
  res.end('PROFILE');
})

module.exports = router;