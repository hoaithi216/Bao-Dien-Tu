var express = require('express');
var blogModel = require('../models/blog.model');
var categoryModel = require('../models/category.model');
const router = express.Router();
router.use(express.static('public'));

require('../middlewares/sesson')(router);

router.get('/', function(req, res, next) {
    let IDcat = IDcate; // Refactored to access our albumId property
    console.log(IDcat);
    next();
    // retrieve album's track data and render track list page
  });
router.get('/:IDblog', (req, res, next) => {

    let IDcategory = IDcate; // <-- How do we get this?
    let IDblog = req.params.IDblog;
    Promise.all([
      blogModel.single(IDblog),

    ]).then(Blog => {
      console.log(Blog);
     
      res.render('vwBlogs/singleBlog', {
        layout: 'category_blog.hbs',
        singleBlog: Blog,
        
        

    });
    
    
    
  }).catch(next);



 

})
module.exports= router ;