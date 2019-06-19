var express = require('express');
var bcrypt = require('bcrypt');
var userModel = require('../../models/user.model');
var passport = require('passport');
var moment = require('moment');

var temp = require('../../models/manageusers.model');
var admin = require('../../middlewares/admin');


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

router.get('/', admin, (req, res) => {
  temp.all().then(rows => {
    console.log(rows);
    res.render('f_admin/vwUsers/listall', {
      layout: 'dashboard.hbs',
      listusers: rows

    });
  }).catch(err => {
    console.log(err);
  });
})

router.get("/add",admin, (req, res, next) => {
  res.render('f_admin/vwUsers/add', {
    layout: 'dashboard.hbs'
  });
})




router.post('/add',admin, (req, res, next) => {
  var d = new Date();
  var currdate = moment(d).format('YYYY-MM-DD');
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds);
  var entity = {
    Username: req.body.username,
    Password: hash,
    TimeSub: currdate,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.email,
    Permission: req.body.Permission,
  }
  userModel.add(entity).then(id => {

    res.redirect('/admin/manageusers');
  })
})


router.get('/view/:id', admin, (req, res) => {
  var iduser = req.params.id

  temp.singleUser(iduser).then(rows => {
    var dateregister = moment(rows[0].TimeSub).format('YYYY-MM-DD');
    var datexp = moment(rows[0].EXP).format('YYYY-MM-DD');

    res.render('f_admin/vwUsers/view', {
      layout: 'dashboard.hbs',
      view: rows[0],
      per : rows[0].Permission,
      dateregister: dateregister,
      datexp: datexp
    });
  }).catch(err => {
    console.log(err);
  });
})


router.get('/edit/:id', admin,(req, res) => {
  var iduser = req.params.id
  temp.user(iduser).then(rows => {
    res.render('f_admin/vwUsers/edituser', {
      layout: 'dashboard.hbs',
      user:rows[0],
      id:iduser,
      per: rows[0].Permission
    });
  }).catch(err => {
    console.log(err);
  });
})


router.post('/update/:id', admin,(req,res) =>{
  var iduser = req.params.id;
  temp.update(iduser,req.body.Permission)
  .then (id =>{
      res.redirect(`/admin/manageusers/view/${iduser}`)
  }).catch(err =>{
      console.log(err);
  })
})


router.post('/delete/:id', admin, (req,res) =>{
  var id = req.params.id;
  temp.delete(id)
  .then (id =>{
     res.redirect(`/admin/manageusers`)
  }).catch(err =>{
      console.log(err);
  })
})
module.exports = router;