var express = require('express');
var moment = require('moment');
var temp = require('../../models/manageparents.model');
var admin = require('../../middlewares/admin');


var router = express.Router();


router.get('/', (req, res) => {
    
    temp.all().then(rows => {
        console.log(rows);
        res.render('f_admin/vwParents/listall', {
            layout: 'dashboard.hbs',
            listparents: rows
           
        });
    }).catch(err => {
        console.log(err);
    });
})


router.get('/:id/:parents', (req, res) => {
    var par = req.params.parents;
    var id = req.params.id;
   
    res.render('f_admin/vwParents/editcate', {
        layout: 'dashboard.hbs',
        par:par,
        id: id,
    
       
    });
})

router.post('/update/:id', (req,res) =>{
    var id = req.params.id;
    temp.update(id,req.body.NameParents)
    .then (id =>{
        res.redirect(`/admin/manageparents`)
    }).catch(err =>{
        console.log(err);
    })
})

router.post('/delete/:id', (req,res) =>{
    var id = req.params.id;
    temp.delete(id)
    .then (id =>{
      // res.redirect(`/admin/manageparents`)
      res.end("chua xu li")
    }).catch(err =>{
        console.log(err);
    })
})


router.get('/add', (req, res) => {
    res.render('f_admin/vwParents/add', {
        layout: 'dashboard.hbs'
    });
})

router.post('/add', (req, res) => {
    temp.insert(req.body.NameParents).then(rows => {
        res.redirect(`/admin/manageparents`)
    }).catch(err => {
        console.log(err);
    });
})


module.exports = router;