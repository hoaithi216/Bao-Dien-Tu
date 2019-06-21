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
    return db.load(`select count(*) as total from blogs  where IDCategory = ${IDcat} AND  DATEDIFF(DatePublic,CURRENT_DATE()) <= 0 AND Status != 0
   `);
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
  top10perCat: () =>{
    return db.load(`select b.*, c.NameCategory, u.NickName
      from blogs b inner join (select IDCategory, MAX(b.amount_of_views) as max from blogs b
                                  where Status = 1 and DATEDIFF(b.DateProduct, CURRENT_DATE()) <= 0
                                  GROUP BY b.IDCategory) as tv
      on tv.IDCategory = b.IDCategory and b.amount_of_views = tv.max
      inner join users u on b.Auth = u.IDuser
      inner join category c on b.IDCategory = c.IDCategory`)
  },
  top10newBlog: () =>{
    return db.load(`SELECT * from blogs b
    WHERE DATEDIFF(b.DatePublic, CURRENT_DATE()) <= 0
    ORDER BY b.DatePublic DESC
    LIMIT 5`)
  },
  Query2: () =>{
    return db.load(`SELECT * from blogs WHERE status = 2`);
  },
  Query3: () =>{
    return db.load(`SELECT * from blogs WHERE status = 3`);
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