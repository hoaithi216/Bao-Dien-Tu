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
  searchAll: query =>{
    return db.load(`select * from blogs where match (Tittle, Context, SortContext) AGAINST ("${query}") `);
  },
  AllBlogPublished: () =>{
    return db.load(`select * from blogs b

    where DATEDIFF(DatePublic,CURRENT_DATE()) <= 0
          AND b.Status = 1;
      `)
  },

  pageByCat: (IDCategory, limit, offset) => {
    return db.load(`select * from blogs where IDCategory = ${IDCategory} limit ${limit} offset ${offset}`);
  },

  countByCat: IDcat => {
    return db.load(`select count(*) as total from blogs  where IDCategory = ${IDcat} AND  DATEDIFF(DatePublic,CURRENT_DATE()) <= 0
    AND Status = 1`);
  },
 
 /////////// Thanh
  allByWriter: Auth => {
    return db.load(`select *, count(*) as num_of_blogs from blogs b where b.Auth = ${Auth}`);
  },

  getBlogs: (Auth, StatusEditor) => {
    return db.load(`select * from blogs b where b.Auth = ${Auth} and b.statuseditor = ${StatusEditor}`);
  },

  getBlogsWithoutPremium: (Auth, StatusEditor) => {
    return db.load(`select * from blogs b where b.Status = '0'`);
  },

  getBlogsWithoutPremium: (Auth, StatusEditor) => {
    return db.load(`select * from blogs b where `);
  },

  /////////// Thanh

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