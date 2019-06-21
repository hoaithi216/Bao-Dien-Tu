var express = require('express');
var moment = require('moment');
var temp = require('../../models/accrenewal.model');
var admin = require('../../middlewares/admin');


var router = express.Router();


router.get('/', admin, (req, res) => {
    res.locals.isActive = 8
    var p = temp.all();
    p.then(rows => {
        console.log(rows);
        res.render('f_admin/vwAccrenewal/listuser', {
            layout: 'dashboard.hbs',
            listsub: rows
           
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/update/:id', admin, (req, res) => {
    res.locals.isActive = 8
    var id = req.params.id;
    temp.view(id).then(rows =>{
        
        if(rows.length >= 0){
            res.render('f_admin/vwAccrenewal/update', {
                layout: 'dashboard.hbs',
                error: false,
                viewID: rows[0],
            });
        } else {
            res.render('f_admin/vwAccrenewal/update', {
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
router.post('/dateupdate', admin, (req,res) =>{
    //var dob = moment(req.body.EXP, 'DD/MM/YYYY').format('YY-MM-DD');
    console.log(req.body.EXP + "lalala");
    console.log(req.body.IDUser + "lalala");
   
    temp.update(req.body.EXP,req.body.IDUser)
    .then (n =>{
        res.redirect('/admin/renewal')
    }).catch(err =>{
        console.log(err);
    })
})


module.exports = router;