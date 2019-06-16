var express = require('express');
var UsersModel = require('../../models/user.model');



var router = express.Router();


router.get("/", (req, res, next )=> {
    UsersModel.all().then(rows =>{

        res.render('./admin/vwUsers/manageUsers',{
            layout: 'main_admin.hbs',
            Users: rows
    
        });
    })
  
})
router.get("/:idUser", (req, res, next )=> {
    res.render('./admin/vwUsers/manageSingleUsers',{
        layout: 'main_admin.hbs'

    });
})





module.exports = router;