var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from category');
  },

  allSubCatName: () => {
    return db.load('select subNameCat from category');
  },
  allWithDetails: () => {
    return db.load(`
      select *
      from category
     
    `);
  },

   


  single: id => {
    return db.load(`select * from category where IDCategory = ${id}`);
  },
  allByCat: IDParent => {
    return db.load(`select * from category where IDParent = ${IDParent}`);
  },




  add: entity => {
    return db.add('Category', entity);
  },

  update: entity => {
    return db.update('Category', 'IDCategory', entity);
  },

  delete: id => {
    return db.delete('Category', 'IDCategory', id);
  },
  exchangeIDName: () => {
    return db.load(`select IDCategory from Category where subNameCat = 'giao-thong'`);
  },
};