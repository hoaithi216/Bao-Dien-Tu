var express = require('express');
var moment = require('moment');
var temp = require('../../models/managecategory.model');
var admin = require('../../middlewares/admin');


var router = express.Router();


router.get('/', admin, (req, res) => {
    
    temp.all().then(rows => {
        console.log(rows);
        res.render('f_admin/vwCategory/listall', {
            layout: 'dashboard.hbs',
            listcate: rows
           
        });
    }).catch(err => {
        console.log(err);
    });
})


router.get('/:parents/:id/:category', admin,(req, res) => {
    var par = req.params.parents;
    var id = req.params.id;
    var ca = req.params.category;
    res.render('f_admin/vwCategory/editcate', {
        layout: 'dashboard.hbs',
        par:par,
        id: id,
        ca: ca
       
    });
})

router.post('/update/:id', admin,(req,res) =>{
    var id = req.params.id;
    temp.add(id,req.body.NameCategory)
    .then (id =>{
        res.redirect(`/admin/managecategory`)
    }).catch(err =>{
        console.log(err);
    })
})

router.post('/delete/:id', admin,(req,res) =>{
    var id = req.params.id;
    temp.delete(id)
    .then (id =>{
        res.redirect(`/admin/managecategory`)
    }).catch(err =>{
        console.log(err);
    })
})


router.get('/add', admin,(req, res) => {
    
    temp.choose().then(rows => {
        res.render('f_admin/vwCategory/add', {
            layout: 'dashboard.hbs',
            choose: rows
           
        });
    }).catch(err => {
        console.log(err);
    });
})

router.post('/add',admin, (req, res) => {
    temp.insert(req.body.NameCategory,req.body.NameParents).then(rows => {
        res.redirect(`/admin/managecategory`)
    }).catch(err => {
        console.log(err);
    });
})


module.exports = router;