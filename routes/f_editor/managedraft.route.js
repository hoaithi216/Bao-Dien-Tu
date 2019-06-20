var express = require('express');
var moment = require('moment');
var temp = require('../../models/managedraft.model');
var admin = require('../../middlewares/admin');


var router = express.Router();

router.get('/', (req, res) => {
    console.log("ffffffffffffffffffffffffff");
    console.log(req.user.Username);
   // console.log(res.locals.authUser.Username);
   // console.log(locals.authUser.Username);
   // console.log(authUser.Username);
    console.log("ffffffffffffffffffffffffff");
    temp.blogsByEditor(req.user.Username).then(rows => {
        console.log(rows);
        res.render('f_editor/vwDraft/listall', {
            layout: 'dashboard.hbs',
            listblogs: rows
        });
    }).catch(err => {
        console.log(err);
    });
})
module.exports = router;