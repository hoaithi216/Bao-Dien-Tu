var express = require('express');
var blogModel = require('../models/blog.model');
var categoryModel = require('../models/category.model');
var tagModel = require('../models/tag.model');
const router = express.Router();
router.use(express.static('public'));

require('../middlewares/sesson')(router);

router.get('/', function(req, res, next) {
    let IDcat = IDcate; // Refactored to access our albumId property
    
    next();
    // retrieve album's track data and render track list page
  });
router.get('/:IDblog', (req, res, next) => {

    let IDcategory = IDcate; // <-- How do we get this?
    let IDblog = req.params.IDblog;
    Promise.all([
      blogModel.single(IDblog),
      tagModel.allByBlog(IDblog)

    ]).then(([Blog, tags]) => {

      // var singleBlogA = [];
      // singleBlogA.push(Blog);
   
     console.log(Blog);
      res.render('vwBlogs/singleBlog', {
        tags: tags,
        layout: 'main.hbs',
        singleBlog: Blog,
        
        

    });
    
    
    
  }).catch((error) => {
    next();
  });
 



 

})
module.exports= router ;