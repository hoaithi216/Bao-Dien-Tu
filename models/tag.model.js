var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from tags');
  },
  NameTag: ID => {
    return db.load(`select DISTINCT ts.NameTag from tagsblog t join tags  ts where t.IDTag = 1 and t.IDTag = ts.IDTag `);
  },

  allByTag: IDTag => {
    return db.load(`select * from blogs b join tagsblog  t on t.IDBlog = b.IDBlog and t.IDTag = ${IDTag}`);
  },
  allByBlog: IDBlog => {
    return db.load(`select ts.NameTag, ts.IDTag from tagsblog t join   blogs b join tags ts on t.IDBlog = b.IDBlog and t.IDBlog = ${IDBlog} and ts.IDTag = t.IDTag `);
  },
//   searchAll: query =>{
//     return db.load(`select * from tags where match (Tittle, Context, SortContext) AGAINST ("${query}") `);
//   },


//   pageByTag: (IDTag, limit, offset) => {
//     return db.load(`select * from tagsblog where IDTag = ${IDTag} limit ${limit} offset ${offset}`);
//   },

  countByTag: IDtag => {
    return db.load(`select count(*) as total from tags  where IDTag = ${IDtag}`);
  },


  /////////// Thanh

  single: id => {
    return db.load(`select * from tags where IDTag = ${id}`);
  },

  add: entity => {
    return db.add('tags', entity);
  },

  update: entity => {
    return db.update('tags', 'IDTag', entity);
  },

  delete: id => {
    return db.delete('tags', 'IDTag', id);
  }
};