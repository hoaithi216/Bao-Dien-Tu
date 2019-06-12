var db = require('../utils/db');

module.exports = {
  havesubcategory: () => {
    // return db.load('select * from parentcategory');
    return db.load(`select * from category c join  parentcategory p on c.IDParents = p.IDParents `);
  },
  all: () =>{
    return db.load('select * from parentcategory');
  },

  // allByCat: () =>  {
  //   return db.load(`select * from category where IDParents = ${IDParent}`);
  // },
};