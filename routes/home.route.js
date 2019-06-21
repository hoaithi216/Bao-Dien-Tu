var express = require('express');
const router = express.Router();

var blogModel = require('../models/blog.model');

router.get('/', (req, res, next)=>{

    
        
    Promise.all([

        blogModel.top10perCat(),

    ]).then(([top10perCat])=>{
        
        res.render('home', {
            top10perCat: top10perCat
        })

    }).catch((error) => {
        next();
    })

})

module.exports = router;