var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from tags p  ORDER BY p.IDTag ASC ');
    },
    
    update: (id,name) =>{
        return db.load(`UPDATE Tags SET NameTag = "${name}" WHERE IDTag = ${id}`);
    },

    insert:(name)=>{
        return db.load(`insert into Tags (NameTag)
        values("${name}")`)
    },
    delete: (id) =>{
        return db.load(`DELETE FROM tags WHERE IDTag = ${id}`);
    },

};