var parentscat = require('../models/parentscat.model');
var category = require('../models/category.model')
// module.exports = (req, res, next) => {
//   Promise.all([ 
//     parentscat.havesubcategory(),
//     parentscat.all(),
//   ]).then(([havesubcategory,rows]) => {
//     res.locals.havesubcategory = havesubcategory;
//     res.locals.parentscat = rows;
//     next();

//   }).catch (err =>{
//     console.log(err);
//     res.end('erro occured');
//   });

// }
// var parentscat = require('../models/parentscat.model');

module.exports = (req, res, next) => {
  Promise.all([ 
    category.all(),
    parentscat.havesubcategory(),
    
  ]).then(([categories,havesubcategory]) => {
    console.log(categories);
    res.locals.categories = categories;
    res.locals.havesubcategory = havesubcategory;
   
    next();

  }).catch (err =>{
    console.log(err);
    res.end('erro occured');
  });

}