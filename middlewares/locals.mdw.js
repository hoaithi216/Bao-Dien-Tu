var parentscat = require('../models/parentscat.model');

module.exports = (req, res, next) => {
  Promise.all([ 
    parentscat.havesubcategory(),
    parentscat.all(),
  ]).then(([havesubcategory,rows]) => {
    res.locals.havesubcategory = havesubcategory;
    res.locals.parentscat = rows;
    next();

  }).catch (err =>{
    console.log(err);
    res.end('erro occured');
  });

}