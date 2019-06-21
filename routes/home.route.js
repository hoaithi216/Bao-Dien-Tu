var express = require('express');
const router = express.Router();

var blogModel = require('../models/blog.model');

router.get('/', (req, res, next)=>{

    
        
    Promise.all([

        blogModel.top10perCat(),
        blogModel.top10newBlog(),
        blogModel.Query2(),
        blogModel.Query3(),

    ]).then(([top10perCat ,top10newBlog, Query2, Query3])=>{
        
        res.render('home', {
            top10newBlog: top10newBlog,
            top10perCat: top10perCat,
            Query2: Query2,
            Query3: Query3
        })

    }).catch((error) => {
        next();
    })

})

module.exports = router;