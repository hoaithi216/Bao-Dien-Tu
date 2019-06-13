var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from blogs');
  },
  NameCat: ID => {
    return db.load(`select NameCategory from Category where IDCategory = ${ID}`);
  },

  allByCat: IDcat => {
    return db.load(`select * from blog b join category c on c.IDCategory = b.IDBlog and c.IDCategory = ${IDcat}`);
  },

  pageByCat: (IDCategory, limit, offset) => {
    return db.load(`select * from blogs where IDCategory = ${IDCategory} limit ${limit} offset ${offset}`);
  },

  countByCat: IDcat => {
    return db.load(`select count(*) as total from blogs where IDCategory = ${IDcat}`);
  },
 

  single: id => {
    return db.load(`select * from blogs where IDBlog = ${id}`);
  },

  add: entity => {
    return db.add('blogs', entity);
  },

  update: entity => {
    return db.update('blogs', 'IDBlog', entity);
  },

  delete: id => {
    return db.delete('blogs', 'IDBlog', id);
  }
};