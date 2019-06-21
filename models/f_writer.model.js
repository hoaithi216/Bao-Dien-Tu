var db = require('../utils/db');

module.exports = {
  allblogbyrefuse: (id) => {
    return db.load(`SELECT b.*, c.NameCategory FROM blogs b LEFT JOIN category c ON b.IDCategory = c.IDCategory where b.Auth = ${id} and b.StatusEditor = 1`);
  },

  allblogbyagree: (id) => {
    return db.load(`SELECT b.*, c.NameCategory FROM blogs b LEFT JOIN category c ON b.IDCategory = c.IDCategory where b.Auth = ${id} and b.StatusEditor = 2`);
  },
  allblogbydraft: (id) => {
    return db.load(`SELECT b.*, c.NameCategory FROM blogs b LEFT JOIN category c ON b.IDCategory = c.IDCategory where b.Auth = ${id} and b.StatusEditor = 0`);
  },
  findStatusEditor:(id) =>{
    return db.load(`select b.StatusEditor from blogs b where b.IDBlog = ${id}`)
  },
  fullTags: () => {
    return db.load(`SELECT * from tags `);
  },
  fullCate: () => {
    return db.load(`SELECT * from category`);
  },
  scope: ()=>{
    return db.load('SELECT @@IDENTITY')
  }



};