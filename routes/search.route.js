var express = require('express');
var router = express.Router();
var blogModel = require('../models/blog.model');

router.get('/', (req,res,next) =>{
   var query = req.query.query;
  
    blogModel.searchAll(query).then(rows => {
        console.log(rows);
        res.render('./search',{
            blogs: rows,
            layout: 'main.hbs'
        });
    
    }).catch(err => {
        console.log(err); })
    
});

module.exports = router;