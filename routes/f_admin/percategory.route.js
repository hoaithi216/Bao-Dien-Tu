var express = require('express');
var categoryModel = require('../../models/percategory.model');

var router = express.Router();


router.get('/', (req, res) => {
    var p = categoryModel.all();
    p.then(rows => {
        console.log(rows);
        res.render('f_admin/vwPerCategory/listeditor', {
            layout: 'dashboard.hbs',
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/view/:id', (req, res) => {
    var id = req.params.id;

    categoryModel.single(id).then(rows =>{
        console.log(typeof id);
        console.log(id.toString());
        var iduser = id;
        if(rows.length >= 0){
            res.render('f_admin/vwPerCategory/view', {
                layout: 'dashboard.hbs',
                error: false,
                categories: rows,
                iduser: iduser
            });
        } else {
            res.render('f_admin/vwPerCategory/view', {
                layout: 'dashboard.hbs',
                error: true
            });
        }
        console.log(rows);
        }).catch(err => {
        console.log(err);
        res.end('error occured')
    });

})

router.get('/edit/:id/:name', (req, res) => {
    var id = req.params.id;
    var name = req.params.name;
    var p = categoryModel.choose(id);
    p.then(rows => {
        console.log(rows);
        res.render('f_admin/vwPerCategory/edit', {
            layout: 'dashboard.hbs',
            editchuyenmuc: rows,
            id:id,
            name:name
        });
    }).catch(err => {
        console.log(err);
    });

})

router.get('/add/:id', (req, res) => {
    var id = req.params.id;
    var p = categoryModel.choose(id);
    p.then(rows => {
        console.log(rows);
        var iduser = id;
        res.render('f_admin/vwPerCategory/add', {
            layout: 'dashboard.hbs',
            editchuyenmuc: rows,
            iduser: iduser
        });
    }).catch(err => {
        console.log(err);
    });

})

router.post('/add', (req,res) =>{
    
    console.log(req.body.IDUser + "lalalalalalalalalalala");
    console.log(req.body.NameCategory + "lalalalalalalalalalala");
    categoryModel.add(req.body.IDUser,req.body.NameCategory)
    .then (n =>{
        res.redirect(`view/${req.body.IDUser}`)
    }).catch(err =>{
        console.log(err);
    })
})


router.post('/update/:name', (req,res) =>{
    var name = req.params.name;
    console.log(req.body.NameCategory);
    console.log(req.body.IDUser);
    console.log(name);
    categoryModel.update(req.body.IDUser,req.body.NameCategory,name)
    .then (id =>{
        res.redirect(`/admin/percategory/view/${req.body.IDUser}`)
    }).catch(err =>{
        console.log(err);
    })
})

router.post('/delete', (req,res) =>{
    categoryModel.delete(req.body.IDUser,req.body.NameCategory)
    .then (id =>{
        res.redirect(`/admin/percategory/view/${req.body.IDUser}`)
    }).catch(err =>{
        console.log(err);
    })
})

module.exports = router;