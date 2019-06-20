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
        return db.load(`SELECT DISTINCT t.* FROM blogs b, tags t, tagsblog tb WHERE b.IDBlog = tb.IDBlog AND t.IDTag = tb.IDTag And b.IDBlog = ${id}`);
    },

    findCate:(idcate) =>{
        return db.load(`select c.NameCategory from category c where not EXISTS(
            select *
            from blogs b
            where c.IDCategory = b.IDCategory
            and b.IDCategory = ${idcate})`)
    },
    findCate2:(id) =>{
        return db.load(`select * from category c where c.IDCategory != ${id}`)
    },
    findTag:(id) =>{
        return db.load(`select * from tags t where t.IDTag != ${id}`)
    },

    findIDCate:(NameCate) =>{
        return db.load(`select c.* from category c where c.NameCategory = "${NameCate}"`)
    },

    findIDTag:(NameTag) =>{
        return db.load(`select t.* from tags t where t.NameTag = "${NameTag}"`)
    },

    update: entity => {
        return db.update('blogs', 'IDBlog', entity);
    },

    delete:(id) =>{
        return db.load(`DELETE FROM blogs WHERE IDBlog = ${id}`)
    },

    allCategory: () => {
        return db.load(`SELECT * from category `);
    },
    
    blogsByCategory: (id) => {
        return db.load(`SELECT b.*, u.Username , c.NameCategory FROM blogs b LEFT JOIN users u on b.Auth = u.IDuser LEFT JOIN category c ON b.IDCategory = c.IDCategory where b.IDCategory = ${id}`);
    },

    blogsByTag: (id) => {
        return db.load(`SELECT b.*, u.Username , c.NameCategory, tb.* FROM blogs b LEFT JOIN users u on b.Auth = u.IDuser LEFT JOIN category c ON b.IDCategory = c.IDCategory LEFT JOIN tagsblog tb on tb.IDBlog = b.IDBlog Where tb.IDTag = ${id}`);
    },
    allTag: () => {
        return db.load(`SELECT * from tags `);
    },

    findNameTag: (id) => {
        return db.load(`SELECT * from tags where tags.IDTag = ${id}`);
    },


    TagsnotBlog: (id) => {
        return db.load(`SELECT * from tags t where not EXISTS (SELECT tb.IDTag from tagsblog tb WHERE t.IDTag=tb.IDTag And tb.IDBlog = ${id})`);
    },

    insertTagsBlog:(idblog,idtag)=>{
        return db.load(`insert into tagsblog (IDBlog,IDTag)
        values(${idblog},${idtag})`)
    },
    deleteTagbyBlog:(id)=>{
        return db.load(`DELETE FROM tagsblog
        WHERE tagsblog.IDBlog = ${id}`)
    }

    

    


};