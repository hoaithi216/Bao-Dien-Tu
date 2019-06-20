var express = require('express');
const showByCat = require('./showByCat.route');
var tagModel = require('../models/tag.model');
var parentsCat = require('../models/parentscat.model');
const router = express.Router();

router.use(express.static('public'));
require('../middlewares/sesson')(router);


router.get('/:IDTag', (req, res, next) => {
 
  var IDTag = req.params.IDTag;
  
    Promise.all([
     
        tagModel.NameTag(IDTag),
        
     
        tagModel.allByTag(IDTag)
    ]).then(([NameTag  ,rows]) => {
  
      console.log(NameTag);
    //   for (const c of res.locals.tags) {
    //     if (c.IDTag === +IDTag) {
    //       c.isActive = true;
    //     }
    //   }
  
    //   var pages = [];
    //   var total = count_rows[0].total;
    //   var nPages = Math.floor(total / limit);
    //   if (total % limit > 0) nPages++;
    //   for (i = 1; i <= nPages; i++) {
    //     var active = false;
    //     if (+page === i) active = true;
  
    //     var obj = {
    //       value: i,
    //       active
    //     }
    //     pages.push(obj);
    //   }

      res.render('vwBlogs/byTag', {
        
        NameTag: NameTag,
        layout: 'main.hbs',
        Blogs: rows,
  
        
      });

    })
  


 

});




// router.use('/:IDTag/blog', function(req, res, next) {
//   IDTage = req.params.IDTag;
//   next()
// }, showByCat );


module.exports = router;