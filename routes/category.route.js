var express = require('express');
const showByCat = require('./showByCat.route');
var blogModel = require('../models/blog.model');
var parentsCat = require('../models/parentscat.model');
const router = express.Router();

router.use(express.static('public'));
require('../middlewares/sesson')(router);


router.get('/:IDcat', (req, res, next) => {
  res.locals.IDcate = req.params.IDcat;
  var IDcat = req.params.IDcat;
  
 
  
  

  var limit = 6;

 

  var page = req.query.page || 1;
  if (page < 1) page = 1;
  var offset = (page - 1) * limit;
  
    
    Promise.all([
     
      blogModel.countByCat(IDcat),
      blogModel.NameCat(IDcat),
     
      blogModel.pageByCat(IDcat, limit, offset)
    ]).then(([count_rows ,NameCat, ,rows]) => {
      console.log(parentsCat1[0]);
      
      for (const c of res.locals.categories) {
        if (c.IDCategory === +IDcat) {
          c.isActive = true;
        }
      }
  
      var pages = [];
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      for (i = 1; i <= nPages; i++) {
        var active = false;
        if (+page === i) active = true;
  
        var obj = {
          value: i,
          active
        }
        pages.push(obj);
      }

      res.render('vwBlogs/byCat', {
        
    
        layout: 'main.hbs',
        Blogs: rows,
        pages
        
      });

    })
  


 

});




router.use('/:IDcat/blog', function(req, res, next) {
  IDcate = req.params.IDcat;
  next()
}, showByCat );


module.exports = router;