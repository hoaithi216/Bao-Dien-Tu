var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from blog');
  },

  allByCat: IDBlog => {
    return db.load(`select * from products where CatID = ${IDBlog}`);
  },

  pageByCat: (IDCategory, limit, offset) => {
    return db.load(`select * from products1 where CatID = ${IDCategory} limit ${limit} offset ${offset}`);
  },

  countByCat: IDCategory => {
    return db.load(`select count(*) as total from blog where CatID = ${IDCategory}`);
  },

  single: id => {
    return db.load(`select * from products where ID = ${id}`);
  },

  add: entity => {
    return db.add('products', entity);
  },

  update: entity => {
    return db.update('products', 'ProID', entity);
  },

  delete: id => {
    return db.delete('products', 'ProID', id);
  }
};