var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load(`SELECT b.*, u.Username FROM blogs b LEFT JOIN users u on b.Auth = u.IDuser `);
    },

    findAuth: (id) => {
        return db.load(`SELECT u.* FROM blogs b, users u WHERE b.Auth = u.IDuser AND b.Auth = ${id}`);
    },

    singleBlog: (id) => {
        return db.load(`SELECT b.*, u.Username, c.NameCategory FROM blogs b LEFT JOIN users u  on b.Auth = u.IDuser LEFT JOIN category c ON b.IDCategory = c.IDCategory where b.IDBlog = ${id}`);
    },
    
    findTags: (id) => {
        return db.load(`SELECT t.* FROM blogs b, tags t, tagsblog tb WHERE b.IDBlog = tb.IDBlog AND t.IDTag = tb.IDTag And b.IDBlog = ${id}`);
    },

    findCate:(idcate) =>{
        return db.load(`select c.NameCategory from category c where not EXISTS(
            select *
            from blogs b
            where c.IDCategory = b.IDCategory
            and b.IDCategory = ${idcate})`)
    },

    findIDCate:(NameCate) =>{
        return db.load(`select c.IDCategory from category c where c.NameCategory = "${NameCate}"`)
    },

    update: entity => {
        return db.update('blogs', 'IDBlog', entity);
      },

    


};