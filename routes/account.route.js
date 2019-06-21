var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var userModel = require('../models/user.model');
var passport = require('passport');
var auth = require('../middlewares/auth');


var router = express.Router();
router.get("/is-available", (req, res, next) => {

  var user1 = req.query.username;
  userModel.singleByUserName(user1).then(rows => {
    if (rows.length > 0) {
      res.end("false");
    }
    res.end("true");
  })
})

router.get("/register", (req, res, next) => {
  res.render('vwAccount/register', { layout: 'baseview-writer.hbs' });


})

router.post('/register', (req, res, next) => {
  var d = new Date();
  var currdate = moment(d).format('YYYY-MM-DD');

  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds);
  var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  var entity = {
    Username: req.body.username,
    Password: hash,
    FirstName: req.body.FristName,
    LastName: req.body.LastName,
    Email: req.body.email,
    DOB: dob,
    Permission: 0,
    TimeSub: currdate,
  }

  var EXP = new Date();
  EXP = addDays(EXP, 7);
  EXP = moment(EXP).format('YYYY-MM-DD');
  userModel.add(entity).then(id => {
    userModel.addate(req.body.username, EXP).then(id => {
      res.redirect('/account/login');
    })
  })
})



router.get("/login", (req, res, next) => {
  res.render('vwAccount/login', { layout: false });
})

router.post('/login', (req, res, next) => {
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
      req.session.user = user;
      var retUrl = req.session.retUrl;
      console.log(retUrl);
      if (!retUrl) {
        switch (user.Permission) {
          case 0:
            retUrl = '/';
            break;
          case 1:
            retUrl = '/f_writer';
            break;
          case 2:
            retUrl = '/f_editor';
            break;
          case 3:
            retUrl = '/admin';
            break;
        }
      }
      delete req.session.retUrl;
      return res.redirect(retUrl);
    });
  })(req, res, next);
})


router.get("/profile", auth, function (req, res) {
  res.locals.isActive = 17
  console.log(req.user.IDuser)
  userModel.findInfoUser(req.user.IDuser).then(rows => {
    var date = rows[0].DOB
    date = moment(date).format('DD/MM/YYYY');
    res.render("vwAccount/profile", {
      layout: 'dashboard.hbs',
      users: rows[0],
      date:date
    });
  })
});

router.post("/profile", auth, function (req, res) {
  var date = moment(req.body.DOB,'DD-MM-YYYY').format('YYYY-MM-DD');
  if(req.user.Permission == 1){
    var entity = {
      IDuser: req.user.IDuser,
      Username: req.body.Username,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      DOB : date,
      NickName: req.body.NickName
    }
  }else{
    var entity = {
      IDuser: req.user.IDuser,
      Username: req.body.Username,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      DOB : date
    }
  }
  
  userModel.update(entity).then (id =>{
    res.redirect("/account/profile")
  })
});

router.get('/logout', auth, function (req, res) {
  req.logOut();
  res.redirect('/');
});


function addDays(dateObj, numDays) {
  dateObj.setDate(dateObj.getDate() + numDays);
  return dateObj;
}

module.exports = router;