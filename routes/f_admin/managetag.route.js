var express = require('express');
var moment = require('moment');
var temp = require('../../models/managetag.model');
var admin = require('../../middlewares/admin');

var router = express.Router();
router.get('/', admin,(req, res) => {
    res.locals.isActive = 7
    temp.all().then(rows => {
        console.log(rows);
        res.render('f_admin/vwTag/listall', {
            layout: 'dashboard.hbs',
            listtag: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/:id/:tag', admin,(req, res) => {
    res.locals.isActive = 7
    var tag = req.params.tag;
    var id = req.params.id;
   
    res.render('f_admin/vwTag/edittag', {
        layout: 'dashboard.hbs',
        tag:tag,
        id: id,
    });
})

router.post('/update/:id', admin,(req,res) =>{
    var id = req.params.id;
    temp.update(id,req.body.NameTag)
    .then (id =>{
        res.redirect(`/admin/managetag`)
    }).catch(err =>{
        console.log(err);
    })
})

router.post('/delete/:id', admin,(req,res) =>{
    var id = req.params.id;
    temp.delete(id)
    .then (id =>{
       res.redirect(`/admin/managetag`)
     // res.end("chua xu li")
    }).catch(err =>{
        console.log(err);
    })
})


router.get('/add', admin,(req, res) => {
    res.locals.isActive = 7
    res.render('f_admin/vwTag/add', {
        layout: 'dashboard.hbs'
    });
})

router.post('/add', admin, (req, res) => {
    temp.insert(req.body.NameTag).then(rows => {
        res.redirect(`/admin/managetag`)
    }).catch(err => {
        console.log(err);
    });
})


module.exports = router;