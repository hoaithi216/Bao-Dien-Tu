var parentscat = require('../models/parentscat.model');
var category = require('../models/category.model')
var tag = require('../models/tag.model')
// // module.exports = (req, res, next) => {
// //   Promise.all([ 
// //     parentscat.havesubcategory(),
// //     parentscat.all(),
// //   ]).then(([havesubcategory,rows]) => {
// //     res.locals.havesubcategory = havesubcategory;
// //     res.locals.parentscat = rows;
// //     next();

// //   }).catch (err =>{
// //     console.log(err);
// //     res.end('erro occured');
// //   });

// // }
// // var parentscat = require('../models/parentscat.model');

module.exports = (req, res, next) => {
  Promise.all([ 
    category.all(),
    tag.all()
    // parentscat.havesubcategory(),
    
  ]).then(([categories,tags]) => {
    
    res.locals.categories = categories;
    res.locals.tags = tags;
  
 
   
    next();

  }).catch (err =>{
    console.log(err);
    res.end('erro occured');
  });

}